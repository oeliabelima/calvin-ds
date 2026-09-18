import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import { analyzeComponent, buildRegistry } from './lib/tokenUsage.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const componentsDir = join(repoRoot, 'src/components')
const outputFile = join(repoRoot, 'src/foundations/usage/token-usage.generated.json')

const registry = buildRegistry({
  stylesCss: readFileSync(join(repoRoot, 'src/styles.css'), 'utf8'),
  primitiveCss: readFileSync(join(repoRoot, 'src/tokens/primitive.css'), 'utf8'),
  semanticCss: readFileSync(join(repoRoot, 'src/tokens/semantic.css'), 'utf8'),
})

function mergeAnalyses(analyses) {
  const tokenGroups = new Map()
  const arbitrary = new Set()
  const problemGroups = new Map()

  for (const analysis of analyses) {
    for (const token of analysis.tokens) {
      const existing = tokenGroups.get(token.token) ?? { ...token, classes: [] }
      existing.classes.push(...token.classes)
      tokenGroups.set(token.token, existing)
    }
    for (const className of analysis.arbitrary) arbitrary.add(className)
    for (const problem of analysis.problems) {
      problemGroups.set(`${problem.class}:${problem.type}`, problem)
    }
  }

  return {
    tokens: [...tokenGroups.values()]
      .map((token) => ({ ...token, classes: [...new Set(token.classes)].sort() }))
      .sort((a, b) => a.kind.localeCompare(b.kind) || a.token.localeCompare(b.token)),
    arbitrary: [...arbitrary].sort(),
    problems: [...problemGroups.values()].sort(
      (a, b) => a.class.localeCompare(b.class) || a.type.localeCompare(b.type),
    ),
  }
}

const componentEntries = []

for (const dirent of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue
  const componentDir = join(componentsDir, dirent.name)
  const names = readdirSync(componentDir).sort()
  const storiesFile = names.find((name) => name.endsWith('.stories.tsx'))
  if (!storiesFile) continue

  const storiesSource = readFileSync(join(componentDir, storiesFile), 'utf8')
  const title = storiesSource.match(/\btitle\s*:\s*(['"])(.*?)\1/)?.[2]
  if (!title) continue

  const componentFiles = names.filter(
    (name) =>
      name.endsWith('.tsx') && !name.endsWith('.test.tsx') && !name.endsWith('.stories.tsx'),
  )
  const analyses = componentFiles.map((name) =>
    analyzeComponent({ source: readFileSync(join(componentDir, name), 'utf8'), registry }),
  )
  const files = componentFiles.map((name) =>
    relative(repoRoot, join(componentDir, name)).split(sep).join('/'),
  )

  componentEntries.push([
    title,
    {
      dir: dirent.name,
      files,
      ...mergeAnalyses(analyses),
    },
  ])
}

componentEntries.sort(([left], [right]) => left.localeCompare(right))
const report = { components: Object.fromEntries(componentEntries) }
writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`)

const components = Object.values(report.components)
const tokenCount = components.reduce((sum, component) => sum + component.tokens.length, 0)
const arbitraryCount = components.reduce((sum, component) => sum + component.arbitrary.length, 0)
const problemCount = components.reduce((sum, component) => sum + component.problems.length, 0)

console.log(
  `${components.length} components, ${tokenCount} tokens, ${arbitraryCount} arbitrary, ${problemCount} problems`,
)
