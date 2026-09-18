export type TokenEntry = { name: string; value: string }

export function extractBlock(css: string, opener: RegExp): string | null {
  const flags = opener.flags.replace(/[gy]/g, '')
  const match = new RegExp(opener.source, flags).exec(css)

  if (!match) return null

  const openingBrace = match.index + match[0].lastIndexOf('{')
  let depth = 1

  for (let index = openingBrace + 1; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1
    if (css[index] === '}') depth -= 1

    if (depth === 0) {
      return css.slice(openingBrace + 1, index)
    }
  }

  return null
}

export function parseCustomProperties(block: string): TokenEntry[] {
  const withoutComments = block.replace(/\/\*[\s\S]*?\*\//g, '')

  return Array.from(
    withoutComments.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g),
    ([, name, value]) => ({ name, value: value.trim() }),
  )
}

export function parsePrimitives(css: string): TokenEntry[] {
  const block = extractBlock(css, /(^|\n):root\s*\{/)
  return block ? parseCustomProperties(block) : []
}

export function parseSemantic(css: string): {
  light: TokenEntry[]
  dark: TokenEntry[]
} {
  const lightBlock = extractBlock(css, /(^|\n):root\s*\{/)
  const darkBlock = extractBlock(css, /\[data-theme="dark"\]\s*\{/)

  return {
    light: lightBlock ? parseCustomProperties(lightBlock) : [],
    dark: darkBlock ? parseCustomProperties(darkBlock) : [],
  }
}

export function resolveToPrimitives(
  value: string,
  semanticLight: TokenEntry[],
  primitives: TokenEntry[],
): string[] {
  const resolve = (
    currentValue: string,
    visited: Set<string>,
    depth: number,
  ): string[] => {
    if (depth > 5) return []

    const reference = currentValue.trim().match(/^var\(--([\w-]+)\)$/)
    if (reference) {
      const name = reference[1]
      if (visited.has(name)) return []

      const semantic = semanticLight.find((token) => token.name === name)
      if (!semantic) return []

      const nextVisited = new Set(visited)
      nextVisited.add(name)
      return resolve(semantic.value, nextVisited, depth + 1)
    }

    const normalized = currentValue.trim().toLowerCase()
    if (!/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/.test(normalized)) {
      return []
    }

    return primitives
      .filter(
        (token) =>
          token.name.startsWith('color-') &&
          token.value.trim().toLowerCase() === normalized,
      )
      .map((token) => token.name)
  }

  return resolve(value, new Set(), 0)
}
