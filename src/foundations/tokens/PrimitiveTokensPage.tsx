import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import primitiveCss from '../../tokens/primitive.css?raw'
import { parsePrimitives, type TokenEntry } from './parseTokens'
import { CopyChip, PageShell, SearchBox, Section, Swatch } from './TokensUI'

const tokens = parsePrimitives(primitiveCss)

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 16,
  padding: '12px 0',
}

const nameStyle: CSSProperties = {
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
  minWidth: 220,
}

const valueStyle: CSSProperties = {
  color: 'var(--color-text-secondary)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
}

function VariableRow({
  token,
  children,
}: {
  token: TokenEntry
  children: ReactNode
}) {
  return (
    <div style={rowStyle}>
      {children}
      <code style={nameStyle}>--{token.name}</code>
      <span style={valueStyle}>{token.value}</span>
      <CopyChip text={`var(--${token.name})`} />
    </div>
  )
}

export function PrimitiveTokensPage() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const matches = (token: TokenEntry | undefined) =>
    Boolean(
      token &&
        (!normalizedQuery ||
          token.name.toLowerCase().includes(normalizedQuery) ||
          token.value.toLowerCase().includes(normalizedQuery)),
    )

  const filtered = useMemo(
    () => tokens.filter((token) => matches(token)),
    [normalizedQuery],
  )

  const colors = filtered.filter(
    ({ name }) => name.startsWith('color-') && name !== 'color-shadow-3',
  )
  const radius = filtered.filter(({ name }) => name.startsWith('radius-'))
  const fonts = filtered.filter(
    ({ name }) => name === 'font-sans' || name === 'font-mono',
  )
  const weights = filtered.filter(({ name }) => name.startsWith('font-weight-'))
  const textSizes = tokens.filter((token) => {
    const { name } = token
    if (!name.startsWith('text-') || name.endsWith('--line-height')) return false
    const lineHeight = tokens.find(
      (token) => token.name === `${name}--line-height`,
    )
    return matches(token) || matches(lineHeight)
  })
  const typographyCount = fonts.length + weights.length + textSizes.length * 2
  const opacity = filtered.filter(({ name }) => name.startsWith('opacity-'))
  const spacing = filtered.filter(({ name }) => name.startsWith('spacing-'))
  const borderWidths = filtered.filter(({ name }) =>
    name.startsWith('border-width-'),
  )
  const iconSizes = filtered.filter(({ name }) => name.startsWith('icon-size-'))
  const shadow = filtered.filter(({ name }) => name === 'color-shadow-3')

  const colorFamilies = useMemo(() => {
    const grouped = new Map<string, TokenEntry[]>()
    colors.forEach((token) => {
      const family = token.name.split('-')[1]
      grouped.set(family, [...(grouped.get(family) ?? []), token])
    })
    return grouped
  }, [colors])

  return (
    <PageShell
      title="Primitive Tokens"
      description="The complete low-level token palette, parsed directly from src/tokens/primitive.css."
    >
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search primitive tokens"
      />

      {colors.length > 0 ? (
        <Section title="Colors" count={colors.length}>
          {Array.from(colorFamilies).map(([family, familyTokens]) => (
            <div key={family} style={{ marginBottom: 24 }}>
              <h3
                style={{
                  margin: '0 0 12px',
                  textTransform: 'capitalize',
                  fontSize: 'var(--text-md)',
                }}
              >
                {family}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {familyTokens.map((token) => (
                  <div
                    key={token.name}
                    style={{
                      width: 154,
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-card)',
                      background: 'var(--color-surface)',
                      padding: 12,
                    }}
                  >
                    <Swatch value={token.value} size={56} />
                    <strong style={{ display: 'block', marginTop: 8 }}>
                      {token.name.split('-').at(-1)}
                    </strong>
                    <code
                      style={{ ...nameStyle, display: 'block', minWidth: 0 }}
                    >
                      --{token.name}
                    </code>
                    <span
                      style={{
                        ...valueStyle,
                        display: 'block',
                        margin: '4px 0 8px',
                      }}
                    >
                      {token.value}
                    </span>
                    <CopyChip text={`var(--${token.name})`} label="Copy var" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>
      ) : null}

      {radius.length > 0 ? (
        <Section title="Radius" count={radius.length}>
          {radius.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  width: 56,
                  height: 40,
                  border: '2px solid var(--color-brand)',
                  borderRadius: `var(--${token.name})`,
                }}
              />
            </VariableRow>
          ))}
        </Section>
      ) : null}

      {typographyCount > 0 ? (
        <Section title="Typography" count={typographyCount}>
          {fonts.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span style={{ minWidth: 170, fontFamily: `var(--${token.name})` }}>
                Aa Bb Cc 123
              </span>
            </VariableRow>
          ))}
          {weights.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  minWidth: 170,
                  fontSize: 28,
                  fontWeight: token.value,
                }}
              >
                Aa
              </span>
            </VariableRow>
          ))}
          {textSizes.map((token) => {
            const lineHeight = tokens.find(
              (candidate) => candidate.name === `${token.name}--line-height`,
            )
            return (
              <div
                key={token.name}
                style={{ ...rowStyle, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    minWidth: 280,
                    fontSize: `var(--${token.name})`,
                    lineHeight: `var(--${token.name}--line-height)`,
                  }}
                >
                  Calvin Design System
                </span>
                <div style={{ display: 'grid', gap: 6 }}>
                  <code style={{ ...nameStyle, minWidth: 0 }}>--{token.name}</code>
                  <span style={valueStyle}>Size: {token.value}</span>
                  <CopyChip text={`var(--${token.name})`} />
                </div>
                {lineHeight ? (
                  <div style={{ display: 'grid', gap: 6 }}>
                    <code style={{ ...nameStyle, minWidth: 0 }}>
                      --{lineHeight.name}
                    </code>
                    <span style={valueStyle}>Line height: {lineHeight.value}</span>
                    <CopyChip text={`var(--${lineHeight.name})`} />
                  </div>
                ) : null}
              </div>
            )
          })}
        </Section>
      ) : null}

      {opacity.length > 0 ? (
        <Section title="Opacity" count={opacity.length}>
          {opacity.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'var(--color-brand)',
                  opacity: token.value,
                }}
              />
            </VariableRow>
          ))}
        </Section>
      ) : null}

      {spacing.length > 0 ? (
        <Section title="Spacing" count={spacing.length}>
          {spacing.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  width: token.value,
                  minWidth: 1,
                  height: 12,
                  background: 'var(--color-brand)',
                  borderRadius: 4,
                }}
              />
            </VariableRow>
          ))}
        </Section>
      ) : null}

      {borderWidths.length > 0 ? (
        <Section title="Border width" count={borderWidths.length}>
          {borderWidths.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  width: 96,
                  borderTop: `${token.value} solid var(--color-text-primary)`,
                }}
              />
            </VariableRow>
          ))}
        </Section>
      ) : null}

      {iconSizes.length > 0 ? (
        <Section title="Icon size" count={iconSizes.length}>
          {iconSizes.map((token) => (
            <VariableRow key={token.name} token={token}>
              <span
                style={{
                  width: token.value,
                  height: token.value,
                  border: '1px solid var(--color-text-primary)',
                  borderRadius: 4,
                }}
              />
            </VariableRow>
          ))}
        </Section>
      ) : null}

      {shadow.length > 0 ? (
        <Section title="Shadow" count={shadow.length}>
          {shadow.map((token) => (
            <VariableRow key={token.name} token={token}>
              <Swatch value={token.value} />
              {/* This token is the tint documented for the elevation below. */}
              <span style={{ color: 'var(--color-text-secondary)' }}>
                Elevation: 0px 4px 12px -2px
              </span>
            </VariableRow>
          ))}
        </Section>
      ) : null}
    </PageShell>
  )
}
