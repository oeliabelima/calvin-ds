import { useMemo, useState, type CSSProperties } from 'react'
import primitiveCss from '../../tokens/primitive.css?raw'
import semanticCss from '../../tokens/semantic.css?raw'
import {
  parsePrimitives,
  parseSemantic,
  resolveToPrimitives,
  type TokenEntry,
} from './parseTokens'
import {
  CopyChip,
  isColorValue,
  PageShell,
  SearchBox,
  Section,
  Swatch,
} from './TokensUI'

const primitives = parsePrimitives(primitiveCss)
const semantic = parseSemantic(semanticCss)
const darkByName = new Map(semantic.dark.map((token) => [token.name, token.value]))
const effectiveDark = semantic.light.map((token) => ({
  name: token.name,
  value: darkByName.get(token.name) ?? token.value,
}))

export function resolveCssValue(value: string, tokens: TokenEntry[]): string {
  let current = value.trim()
  const visited = new Set<string>()

  for (let depth = 0; depth < 5; depth += 1) {
    const reference = current.match(/^var\(--([\w-]+)\)$/)
    if (!reference || visited.has(reference[1])) return current
    visited.add(reference[1])
    const token = tokens.find(({ name }) => name === reference[1])
    if (!token) return current
    current = token.value.trim()
  }

  return current
}

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns:
    'minmax(190px, 1fr) minmax(250px, 1.3fr) minmax(220px, 1fr)',
  gap: 20,
  alignItems: 'center',
  padding: '16px 0',
  borderTop: '1px solid var(--color-border-subtle)',
}

const mutedStyle: CSSProperties = {
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--text-xs)',
  lineHeight: 'var(--text-xs--line-height)',
}

type Group = { title: string; tokens: TokenEntry[] }

function groupTokens(tokens: TokenEntry[]): Group[] {
  const feedbackFamilies = ['success', 'warning', 'error', 'info']
  const matched = new Set<string>()
  const take = (predicate: (name: string) => boolean) =>
    tokens.filter((token) => {
      if (!predicate(token.name)) return false
      matched.add(token.name)
      return true
    })

  const feedbackTokens = feedbackFamilies.flatMap((family) =>
    take((name) => name.startsWith(`color-${family}-`)),
  )
  const groups: Group[] = [
    {
      title: 'Background & Surface',
      tokens: take(
        (name) => name === 'color-bg' || name.startsWith('color-surface'),
      ),
    },
    { title: 'Border', tokens: take((name) => name.startsWith('color-border')) },
    { title: 'Brand', tokens: take((name) => name.startsWith('color-brand')) },
    {
      title: 'Feedback — Success/Warning/Error/Info',
      tokens: feedbackTokens,
    },
    { title: 'Text', tokens: take((name) => name.startsWith('color-text-')) },
    { title: 'Icon', tokens: take((name) => name.startsWith('color-icon-')) },
    {
      title: 'State layers',
      tokens: take((name) => name.startsWith('color-state-')),
    },
    { title: 'Radius', tokens: take((name) => name.startsWith('radius-')) },
    { title: 'Spacing', tokens: take((name) => name.startsWith('spacing-')) },
  ]

  const other = tokens.filter((token) => !matched.has(token.name))
  if (other.length > 0) groups.push({ title: 'Other', tokens: other })
  return groups.filter((group) => group.tokens.length > 0)
}

function PrimitivePill({
  mode,
  name,
}: {
  mode: 'light' | 'dark'
  name: string
}) {
  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface-sunken)',
        color: 'var(--color-text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        lineHeight: 'var(--text-xs--line-height)',
        padding: '3px 8px',
      }}
    >
      {mode} → {name.replace(/^color-/, '')}
    </span>
  )
}

export function SemanticTokensPage() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = useMemo(
    () =>
      semantic.light.filter((token) => {
        const darkValue = darkByName.get(token.name) ?? token.value
        const primitiveNames = [
          ...resolveToPrimitives(token.value, semantic.light, primitives),
          ...resolveToPrimitives(darkValue, effectiveDark, primitives),
        ]
        return (
          !normalizedQuery ||
          token.name.toLowerCase().includes(normalizedQuery) ||
          token.value.toLowerCase().includes(normalizedQuery) ||
          darkValue.toLowerCase().includes(normalizedQuery) ||
          primitiveNames.some((name) =>
            name.toLowerCase().includes(normalizedQuery),
          )
        )
      }),
    [normalizedQuery],
  )

  const groups = groupTokens(filtered)

  return (
    <PageShell
      title="Semantic Tokens"
      description="Light and dark semantic values parsed directly from src/tokens/semantic.css, with their matching color primitives."
    >
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search semantic tokens"
      />

      {groups.map((group) => (
        <Section
          key={group.title}
          title={group.title}
          count={group.tokens.length}
        >
          {group.tokens.map((token, index) => {
            const darkIsFallback = !darkByName.has(token.name)
            const darkValue = darkByName.get(token.name) ?? token.value
            const colorToken = token.name.startsWith('color-')
            const lightResolved = resolveCssValue(token.value, semantic.light)
            const darkResolved = resolveCssValue(darkValue, effectiveDark)
            const lightPrimitives = resolveToPrimitives(
              token.value,
              semantic.light,
              primitives,
            )
            const darkPrimitives = resolveToPrimitives(
              darkValue,
              effectiveDark,
              primitives,
            )
            const showDarkPrimitives = darkResolved !== lightResolved
            const tailwindName = token.name.replace(/^color-/, '')

            const feedbackFamily = token.name.split('-')[1]
            const previousFeedbackFamily =
              index > 0 ? group.tokens[index - 1].name.split('-')[1] : undefined
            const showFeedbackHeading =
              group.title.startsWith('Feedback') &&
              feedbackFamily !== previousFeedbackFamily

            return (
              <div key={token.name}>
                {showFeedbackHeading ? (
                  <h3
                    style={{
                      margin: index === 0 ? '0 0 8px' : '24px 0 8px',
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--text-md)',
                      lineHeight: 'var(--text-md--line-height)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {feedbackFamily}
                  </h3>
                ) : null}
                <div style={rowStyle}>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <code
                      style={{
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      --{token.name}
                    </code>
                    <CopyChip text={`var(--${token.name})`} />
                    {colorToken ? (
                      <span style={mutedStyle}>
                        Tailwind: bg-{tailwindName} · text-{tailwindName} ·
                        border-{tailwindName}
                      </span>
                    ) : null}
                  </div>

                  {colorToken ? (
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      <div style={{ display: 'grid', gap: 5 }}>
                        <strong style={{ fontSize: 'var(--text-xs)' }}>
                          Light
                        </strong>
                        <Swatch
                          value={
                            isColorValue(lightResolved)
                              ? lightResolved
                              : token.value
                          }
                          size={32}
                        />
                        <code style={mutedStyle}>{token.value}</code>
                      </div>
                      <div style={{ display: 'grid', gap: 5 }}>
                        <strong style={{ fontSize: 'var(--text-xs)' }}>
                          Dark
                        </strong>
                        <Swatch
                          value={
                            isColorValue(darkResolved)
                              ? darkResolved
                              : darkValue
                          }
                          size={32}
                        />
                        <code style={mutedStyle}>{darkValue}</code>
                        {darkIsFallback ? (
                          <span style={mutedStyle}>= light</span>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      {token.name.startsWith('radius-') ? (
                        <span
                          style={{
                            width: 48,
                            height: 32,
                            border: '2px solid var(--color-brand)',
                            borderRadius: token.value,
                          }}
                        />
                      ) : null}
                      <code style={mutedStyle}>{token.value}</code>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {lightPrimitives.map((name) => (
                      <PrimitivePill
                        key={`light-${name}`}
                        mode="light"
                        name={name}
                      />
                    ))}
                    {showDarkPrimitives
                      ? darkPrimitives.map((name) => (
                          <PrimitivePill
                            key={`dark-${name}`}
                            mode="dark"
                            name={name}
                          />
                        ))
                      : null}
                  </div>
                </div>
              </div>
            )
          })}
        </Section>
      ))}
    </PageShell>
  )
}
