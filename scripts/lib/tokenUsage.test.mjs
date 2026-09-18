import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import {
  analyzeComponent,
  buildRegistry,
  classifyClass,
  extractClasses,
} from './tokenUsage.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')

const registry = buildRegistry({
  stylesCss: readFileSync(join(repoRoot, 'src/styles.css'), 'utf8'),
  primitiveCss: readFileSync(join(repoRoot, 'src/tokens/primitive.css'), 'utf8'),
  semanticCss: readFileSync(join(repoRoot, 'src/tokens/semantic.css'), 'utf8'),
})

describe('classifyClass', () => {
  it.each([
    ['bg-brand', { kind: 'color', token: 'color-brand' }],
    ['hover:bg-state-hover-brand', { kind: 'color', token: 'color-state-hover-brand' }],
    ['text-text-primary', { kind: 'color', token: 'color-text-primary' }],
    ['text-sm', { kind: 'text-size', token: 'text-sm' }],
    ['border-border-focus', { kind: 'color', token: 'color-border-focus' }],
    ['rounded-card', { kind: 'radius', token: 'radius-card' }],
    ['p-24', { kind: 'spacing', token: 'spacing-24' }],
    ['gap-8', { kind: 'spacing', token: 'spacing-8' }],
    ['size-icon-md', { kind: 'icon-size', token: 'size-icon-md' }],
    ['font-semibold', { kind: 'font-weight', token: 'font-weight-semibold' }],
  ])('maps %s to its registered token', (className, expected) => {
    expect(classifyClass(className, registry)).toEqual(expected)
  })

  it.each(['p-20', 'gap-12'])('flags unregistered numeric spacing class %s', (className) => {
    expect(classifyClass(className, registry)).toMatchObject({
      kind: 'problem',
      type: 'unregistered-scale',
      class: className,
    })
  })

  it.each(['top-1/2', '-translate-y-1/2', 'w-1/3', 'hover:left-1/2'])(
    'does not treat fraction class %s as a spacing-scale value (fractions generate CSS regardless of the scale)',
    (className) => {
      expect(classifyClass(className, registry)).toBeNull()
    },
  )

  it.each(['w-[320px]', 'text-[22px]', 'rounded-[20px]'])(
    'keeps non-color arbitrary class %s as informational',
    (className) => {
      expect(classifyClass(className, registry)).toEqual({ kind: 'arbitrary', class: className })
    },
  )

  it('flags a hardcoded arbitrary color', () => {
    expect(classifyClass('bg-[#fff]', registry)).toMatchObject({
      kind: 'problem',
      type: 'hardcoded-color',
      class: 'bg-[#fff]',
    })
  })

  it('extracts token references from arbitrary values', () => {
    expect(
      classifyClass('shadow-[0px_4px_12px_-2px_var(--color-shadow-3)]', registry),
    ).toEqual({ kind: 'var', tokens: ['color-shadow-3'] })
  })

  it.each(['flex', 'items-center', 'opacity-40', 'w-full'])(
    'ignores unrelated class %s',
    (className) => {
      expect(classifyClass(className, registry)).toBeNull()
    },
  )
})

describe('extractClasses', () => {
  it('extracts unique classes from quote styles used by class composition helpers', () => {
    const source = `className={cn('flex gap-8', cond && "p-24")}`

    expect(extractClasses(source)).toEqual(['flex', 'gap-8', 'p-24'])
  })

  it('ignores classes that only appear in comments, even when a comment contains an apostrophe', () => {
    const source = [
      "// Figma's table: Small w-240 media-h-128 | Large w-400",
      '/* block: p-20 gap-12 */',
      "const x = cn('flex gap-8')",
    ].join('\n')

    expect(extractClasses(source)).toEqual(['flex', 'gap-8'])
  })
})

describe('buildRegistry', () => {
  it('resolves semantic colors and identifies their primitive match', () => {
    expect(registry.resolve('color-brand')).toEqual({
      light: '#E1001E',
      dark: '#E1001E',
      primitives: ['color-primary-600'],
    })
  })
})

describe('analyzeComponent', () => {
  it('finds hardcoded hex strings outside className while ignoring comments', () => {
    const source = `
      // const ignored = '#111111'
      /* const alsoIgnored = '#222222' */
      const fill = '#abcdef'
    `

    expect(analyzeComponent({ source, registry }).problems).toEqual([
      {
        class: '#abcdef',
        type: 'hardcoded-color',
        message: 'hex color literal in component source — use a semantic color token',
      },
    ])
  })

  it('reports no real component classes outside the registered spacing scale', () => {
    const componentsDir = join(repoRoot, 'src/components')
    const offenders = []

    for (const dirent of readdirSync(componentsDir, { withFileTypes: true })) {
      if (!dirent.isDirectory()) continue
      const componentDir = join(componentsDir, dirent.name)
      for (const file of readdirSync(componentDir).sort()) {
        if (!file.endsWith('.tsx') || file.endsWith('.test.tsx') || file.endsWith('.stories.tsx')) {
          continue
        }
        const source = readFileSync(join(componentDir, file), 'utf8')
        for (const problem of analyzeComponent({ source, registry }).problems) {
          if (problem.type === 'unregistered-scale') {
            offenders.push(`${relative(repoRoot, join(componentDir, file))}: ${problem.class}`)
          }
        }
      }
    }

    expect(offenders).toEqual([])
  })
})
