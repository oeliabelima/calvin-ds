const DECLARATION_RE = /--([\w*-]+)\s*:\s*([^;]+);/g

function findBlock(source, marker, startAt = 0) {
  const markerIndex = source.indexOf(marker, startAt)
  if (markerIndex === -1) return ''
  const openIndex = source.indexOf('{', markerIndex + marker.length)
  if (openIndex === -1) return ''

  let depth = 1
  for (let index = openIndex + 1; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] === '}') depth -= 1
    if (depth === 0) return source.slice(openIndex + 1, index)
  }
  return ''
}

function parseDeclarations(block) {
  const values = {}
  const withoutComments = block.replace(/\/\*[\s\S]*?\*\//g, '')
  for (const match of withoutComments.matchAll(DECLARATION_RE)) {
    values[match[1]] = match[2].trim()
  }
  return values
}

function sortedUnique(values) {
  return [...new Set(values)].sort()
}

function stripComments(source) {
  let result = ''
  let index = 0
  let quote = null

  while (index < source.length) {
    const char = source[index]
    const next = source[index + 1]

    if (quote) {
      result += char
      if (char === '\\') {
        result += next ?? ''
        index += 2
        continue
      }
      if (char === quote) quote = null
      index += 1
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char
      result += char
      index += 1
      continue
    }

    if (char === '/' && next === '/') {
      while (index < source.length && source[index] !== '\n') index += 1
      result += '\n'
      index += 1
      continue
    }

    if (char === '/' && next === '*') {
      index += 2
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        result += source[index] === '\n' ? '\n' : ' '
        index += 1
      }
      index += 2
      continue
    }

    result += char
    index += 1
  }

  return result
}

function stringLiteralContents(source) {
  const contents = []
  const literalRe = /'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"|`((?:\\.|[^`\\])*)`/gs
  for (const match of source.matchAll(literalRe)) {
    const content = match[1] ?? match[2] ?? (match[3] ?? '').replace(/\$\{[\s\S]*?\}/g, ' ')
    contents.push(content)
  }
  return contents
}

export function buildRegistry({ stylesCss, primitiveCss, semanticCss }) {
  const theme = parseDeclarations(findBlock(stylesCss, '@theme inline'))
  const primitive = parseDeclarations(findBlock(primitiveCss, ':root'))
  const light = parseDeclarations(findBlock(semanticCss, ':root'))
  const dark = parseDeclarations(findBlock(semanticCss, '[data-theme="dark"]'))

  const names = Object.entries(theme)
    .filter(([name, value]) => !name.includes('*') && value !== 'initial')
    .map(([name]) => name)

  const registry = {
    colors: new Set(names.filter((name) => name.startsWith('color-')).map((name) => name.slice(6))),
    radii: new Set(names.filter((name) => name.startsWith('radius-')).map((name) => name.slice(7))),
    spacing: new Set(names.filter((name) => name.startsWith('spacing-')).map((name) => name.slice(8))),
    textSizes: new Set(
      names
        .filter((name) => name.startsWith('text-') && !name.endsWith('--line-height'))
        .map((name) => name.slice(5)),
    ),
    fontWeights: new Set(
      names.filter((name) => name.startsWith('font-weight-')).map((name) => name.slice(12)),
    ),
    borderWidths: new Set(
      names.filter((name) => name.startsWith('border-width-')).map((name) => name.slice(13)),
    ),
    iconSizes: new Set(
      names.filter((name) => name.startsWith('size-icon-')).map((name) => name.slice(10)),
    ),
    fontFamilies: new Set(names.filter((name) => name === 'font-sans' || name === 'font-mono')),
    primitive,
    semanticLight: light,
    semanticDark: dark,
    value(tokenName) {
      return light[tokenName] ?? primitive[tokenName]
    },
    resolve(tokenName) {
      const follow = (initialValue, preferDark) => {
        let value = initialValue
        for (let depth = 0; depth < 5; depth += 1) {
          const reference = value?.match(/^var\(--([\w-]+)\)$/)?.[1]
          if (!reference) break
          value = (preferDark ? dark[reference] : undefined) ?? light[reference] ?? primitive[reference] ?? value
        }
        return value
      }

      const lightValue = follow(light[tokenName] ?? primitive[tokenName], false)
      const darkValue = follow(dark[tokenName] ?? light[tokenName] ?? primitive[tokenName], true)
      const primitives = /^#[0-9a-f]{3,8}$/i.test(lightValue ?? '')
        ? Object.entries(primitive)
            .filter(
              ([name, value]) =>
                name.startsWith('color-') && value.toLowerCase() === lightValue.toLowerCase(),
            )
            .map(([name]) => name)
            .sort()
        : []

      return { light: lightValue, dark: darkValue ?? lightValue, primitives }
    },
  }

  return registry
}

export function extractClasses(source) {
  const candidates = []
  // Comments must go first: an apostrophe in a comment ("Figma's ...") would
  // otherwise open a fake string literal that swallows real code and prose.
  for (const literal of stringLiteralContents(stripComments(source))) {
    for (const candidate of literal.split(/\s+/)) {
      if (!candidate || !/^[A-Za-z0-9_:\-\[\]\/.%#(),=&>*!'"]+$/.test(candidate)) continue
      const withoutVariants = stripVariants(candidate)
      if (/^[a-z!-][\w\-\[\]\/.%#(),&>*=:'"]*$/.test(withoutVariants)) {
        candidates.push(candidate)
      }
    }
  }
  return sortedUnique(candidates)
}

function stripVariants(rawClass, { keepOpacity = false } = {}) {
  let depth = 0
  let lastVariant = -1
  for (let index = 0; index < rawClass.length; index += 1) {
    if (rawClass[index] === '[') depth += 1
    else if (rawClass[index] === ']') depth = Math.max(0, depth - 1)
    else if (rawClass[index] === ':' && depth === 0) lastVariant = index
  }
  const base = rawClass.slice(lastVariant + 1).replace(/^!/, '').replace(/^-/, '')
  return keepOpacity ? base : base.replace(/\/\d+$/, '')
}

export function classifyClass(rawClass, registry) {
  const className = stripVariants(rawClass)
  const arbitraryMatch = className.match(/^.+-\[([\s\S]*)\]$/)
  if (arbitraryMatch) {
    const content = arbitraryMatch[1]
    const tokens = sortedUnique(
      [...content.matchAll(/var\(--([\w-]+)/g)].map((match) => match[1]),
    )
    if (tokens.length > 0) return { kind: 'var', tokens }
    if (/#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl)\(/i.test(content)) {
      return {
        kind: 'problem',
        type: 'hardcoded-color',
        class: rawClass,
        message: 'hardcoded color in arbitrary Tailwind value — use a semantic color token',
      }
    }
    return { kind: 'arbitrary', class: rawClass }
  }

  const textMatch = className.match(/^text-(.+)$/)
  if (textMatch && registry.textSizes.has(textMatch[1])) {
    return { kind: 'text-size', token: `text-${textMatch[1]}` }
  }

  const fontMatch = className.match(/^font-(.+)$/)
  if (fontMatch && registry.fontWeights.has(fontMatch[1])) {
    return { kind: 'font-weight', token: `font-weight-${fontMatch[1]}` }
  }
  if (registry.fontFamilies.has(className)) {
    return { kind: 'font-family', token: className }
  }

  const borderWidthMatch = className.match(/^border(?:-[trblxy])?-(.+)$/)
  if (borderWidthMatch && registry.borderWidths.has(borderWidthMatch[1])) {
    return { kind: 'border-width', token: `border-width-${borderWidthMatch[1]}` }
  }

  const colorMatch = className.match(
    /^(?:bg|text|border(?:-[trblxy])?|ring|outline|fill|stroke|decoration|divide|from|via|to|caret|accent|placeholder)-(.+)$/,
  )
  if (colorMatch && registry.colors.has(colorMatch[1])) {
    return { kind: 'color', token: `color-${colorMatch[1]}` }
  }

  const radiusMatch = className.match(/^rounded(?:-(?:t|b|l|r|tl|tr|bl|br|s|e|ss|se|ee|es))?-(.+)$/)
  if (radiusMatch && registry.radii.has(radiusMatch[1])) {
    return { kind: 'radius', token: `radius-${radiusMatch[1]}` }
  }

  const iconMatch = className.match(/^(?:size|w|h)-icon-(.+)$/)
  if (iconMatch && registry.iconSizes.has(iconMatch[1])) {
    return { kind: 'icon-size', token: `size-icon-${iconMatch[1]}` }
  }

  const spacingPrefixes = [
    'translate-x', 'translate-y', 'scroll-m', 'scroll-p', 'inset-x', 'inset-y', 'space-x',
    'space-y', 'gap-x', 'gap-y', 'min-w', 'max-w', 'min-h', 'max-h', 'inset', 'basis',
    'right', 'bottom', 'left', 'size', 'gap', 'top', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
    'ps', 'pe', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me', 'p', 'm', 'w', 'h',
  ]
  // `top-1/2`, `w-1/3`, `-translate-y-1/2` are fractions (percentages), not
  // spacing-scale values — they generate CSS regardless of the registered scale.
  const isFraction = /-\d+\/\d+$/.test(stripVariants(rawClass, { keepOpacity: true }))
  const spacingMatch = isFraction
    ? null
    : className.match(new RegExp(`^(?:${spacingPrefixes.join('|')})-(\\d+(?:\\.\\d)?)$`))
  if (spacingMatch) {
    const value = spacingMatch[1]
    if (registry.spacing.has(value)) return { kind: 'spacing', token: `spacing-${value}` }
    return {
      kind: 'problem',
      type: 'unregistered-scale',
      class: rawClass,
      message: `spacing value ${value} is not in the registered scale (4,8,16,24,32,40,48,56,64,80,96 and 0): this class generates NO CSS — use an arbitrary value like p-[${value}px] or register a token`,
    }
  }

  return null
}

export function analyzeComponent({ source, registry }) {
  const tokenGroups = new Map()
  const arbitrary = []
  const problems = []

  for (const rawClass of extractClasses(source)) {
    const classification = classifyClass(rawClass, registry)
    if (!classification) continue
    if (classification.kind === 'arbitrary') {
      arbitrary.push(rawClass)
      continue
    }
    if (classification.kind === 'problem') {
      problems.push({
        class: rawClass,
        type: classification.type,
        message: classification.message,
      })
      continue
    }

    const tokenEntries = classification.kind === 'var'
      ? classification.tokens.map((token) => ({ token, kind: 'var' }))
      : [{ token: classification.token, kind: classification.kind }]

    for (const entry of tokenEntries) {
      const key = `${entry.kind}:${entry.token}`
      const existing = tokenGroups.get(key) ?? { ...entry, classes: [] }
      existing.classes.push(rawClass)
      tokenGroups.set(key, existing)
    }
  }

  const uncommented = stripComments(source)
  for (const literal of stringLiteralContents(uncommented)) {
    const literalClasses = literal.split(/\s+/)
    const isHardcodedClass = literalClasses.some(
      (candidate) => classifyClass(candidate, registry)?.type === 'hardcoded-color',
    )
    if (isHardcodedClass) continue
    for (const match of literal.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      problems.push({
        class: match[0],
        type: 'hardcoded-color',
        message: 'hex color literal in component source — use a semantic color token',
      })
    }
  }

  const tokens = [...tokenGroups.values()]
    .map((entry) => {
      const result = { ...entry, classes: sortedUnique(entry.classes) }
      if (entry.kind === 'color' || (entry.kind === 'var' && entry.token.startsWith('color-'))) {
        return { ...result, ...registry.resolve(entry.token) }
      }
      const value = registry.value(entry.token)
      return value === undefined ? result : { ...result, value }
    })
    .sort((a, b) => a.kind.localeCompare(b.kind) || a.token.localeCompare(b.token))

  const uniqueProblems = new Map()
  for (const problem of problems) uniqueProblems.set(`${problem.class}:${problem.type}`, problem)

  return {
    tokens,
    arbitrary: sortedUnique(arbitrary),
    problems: [...uniqueProblems.values()].sort(
      (a, b) => a.class.localeCompare(b.class) || a.type.localeCompare(b.type),
    ),
  }
}
