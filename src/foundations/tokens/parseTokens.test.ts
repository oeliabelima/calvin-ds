import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import primitiveCssRaw from '../../tokens/primitive.css?raw'
import semanticCss from '../../tokens/semantic.css?raw'
import {
  extractBlock,
  parsePrimitives,
  parseSemantic,
  resolveToPrimitives,
} from './parseTokens'

const primitiveCss =
  primitiveCssRaw ||
  readFileSync('src/tokens/primitive.css', 'utf8')
const semanticCssSource =
  semanticCss ||
  readFileSync('src/tokens/semantic.css', 'utf8')

describe('parsePrimitives', () => {
  it('reads primitive token values from the real CSS source', () => {
    const primary600 = parsePrimitives(primitiveCss).find(
      ({ name }) => name === 'color-primary-600',
    )

    expect(primary600?.value).toBe('#E1001E')
  })
})

describe('parseSemantic', () => {
  it('reads the plain root block as light tokens', () => {
    const { light } = parseSemantic(semanticCssSource)

    expect(light.find(({ name }) => name === 'color-brand')?.value).toBe(
      '#E1001E',
    )
    expect(
      light.find(({ name }) => name === 'color-surface-sunken')?.value,
    ).toBe('#F5F4F4')
  })

  it('reads the explicit dark theme block as dark tokens', () => {
    const { dark } = parseSemantic(semanticCssSource)

    expect(dark.find(({ name }) => name === 'color-brand-text')?.value).toBe(
      '#FC8292',
    )
    expect(dark.find(({ name }) => name === 'color-surface')?.value).toBe(
      '#181616',
    )
  })
})

describe('extractBlock', () => {
  it('returns only the requested inner block when its parent is nested', () => {
    const css = `
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) {
          --color-bg: #000000;
        }
      }
    `

    expect(
      extractBlock(css, /:root:not\(\[data-theme="light"\]\)\s*\{/),
    ).toContain('--color-bg: #000000;')
    expect(
      extractBlock(css, /:root:not\(\[data-theme="light"\]\)\s*\{/),
    ).not.toContain('}')
  })
})

describe('resolveToPrimitives', () => {
  it('matches direct and semantic-reference colors but not lengths', () => {
    const primitives = parsePrimitives(primitiveCss)
    const { light } = parseSemantic(semanticCssSource)

    expect(resolveToPrimitives('#E1001E', light, primitives)).toContain(
      'color-primary-600',
    )
    expect(
      resolveToPrimitives('var(--color-text-primary)', light, primitives),
    ).toContain('color-neutral-900')
    expect(resolveToPrimitives('8px', light, primitives)).toEqual([])
  })
})
