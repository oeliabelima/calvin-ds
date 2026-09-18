import { useState } from 'react'

import usage from './token-usage.generated.json'
import { TokenUsagePanel } from './TokenUsagePanel'

const componentEntries = Object.entries(usage.components).sort(([left], [right]) =>
  left.localeCompare(right),
)

const distinctTokens = new Set(
  componentEntries.flatMap(([, component]) => component.tokens.map((token) => token.token)),
)
const totalArbitrary = componentEntries.reduce(
  (sum, [, component]) => sum + component.arbitrary.length,
  0,
)
const totalProblems = componentEntries.reduce(
  (sum, [, component]) => sum + component.problems.length,
  0,
)

const colorIndex = [...distinctTokens]
  .filter((token) =>
    componentEntries.some(([, component]) =>
      component.tokens.some((entry) => entry.token === token && entry.kind === 'color'),
    ),
  )
  .map((token) => ({
    token,
    components: componentEntries
      .filter(([, component]) => component.tokens.some((entry) => entry.token === token))
      .map(([title]) => title),
  }))
  .sort((left, right) => left.token.localeCompare(right.token))

function SummaryItem({ label, value, problem = false }: { label: string; value: number; problem?: boolean }) {
  return (
    <div
      style={{
        minWidth: '140px',
        padding: '16px',
        border: `1px solid ${problem && value > 0 ? 'var(--color-error-border)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-card)',
        background: problem && value > 0 ? 'var(--color-error-bg-subtle)' : 'var(--color-surface)',
        color: problem && value > 0 ? 'var(--color-error-text)' : 'var(--color-text-primary)',
      }}
    >
      <strong style={{ display: 'block', fontSize: '28px', lineHeight: '36px' }}>{value}</strong>
      <span style={{ fontSize: '13px' }}>{label}</span>
    </div>
  )
}

export function TokenUsageOverview() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredComponents = componentEntries.filter(([title, component]) =>
    [title, ...component.tokens.map((token) => token.token)].some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  )
  const filteredColorIndex = colorIndex.filter(({ token, components }) =>
    [token, ...components].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
  )

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '32px',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '40px', lineHeight: '48px' }}>Token Usage</h1>
        <p style={{ margin: '0 0 24px', color: 'var(--color-text-secondary)' }}>
          Tokens detectados estaticamente nas classes Tailwind de cada componente.
        </p>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <SummaryItem label="componentes" value={componentEntries.length} />
          <SummaryItem label="tokens distintos" value={distinctTokens.size} />
          <SummaryItem label="valores arbitrários" value={totalArbitrary} />
          <SummaryItem label="problemas" value={totalProblems} problem />
        </section>

        <label style={{ display: 'block', marginBottom: '24px' }}>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: 600 }}>
            Buscar componente ou token
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: CardMetric ou color-brand"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-input)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              font: 'inherit',
              outlineColor: 'var(--color-border-focus)',
            }}
          />
        </label>

        <section>
          <h2 style={{ margin: '0 0 12px', fontSize: '28px', lineHeight: '36px' }}>Componentes</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {filteredComponents.map(([title, component]) => (
              <details
                key={title}
                style={{
                  padding: '16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--color-surface)',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                  {component.problems.length ? (
                    <span style={{ color: 'var(--color-error-text)', marginRight: '8px' }}>●</span>
                  ) : null}
                  {title}
                  <span
                    style={{ marginLeft: '8px', color: 'var(--color-text-secondary)', fontSize: '13px', fontWeight: 400 }}
                  >
                    {component.tokens.length} tokens · {component.arbitrary.length} arbitrários ·{' '}
                    {component.problems.length} problemas
                  </span>
                </summary>
                <TokenUsagePanel title={title} />
              </details>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '28px', lineHeight: '36px' }}>
            Token → componentes
          </h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {filteredColorIndex.map(({ token, components }) => (
              <div
                key={token}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(220px, 1fr) 3fr',
                  gap: '16px',
                  padding: '12px 16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--color-surface)',
                }}
              >
                <code>--{token}</code>
                <span style={{ color: 'var(--color-text-secondary)' }}>{components.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
