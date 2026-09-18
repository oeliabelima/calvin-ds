import usage from './token-usage.generated.json'

type TokenKind =
  | 'color'
  | 'radius'
  | 'text-size'
  | 'font-weight'
  | 'font-family'
  | 'spacing'
  | 'border-width'
  | 'icon-size'
  | 'var'

interface TokenEntry {
  token: string
  kind: TokenKind
  classes: string[]
  value?: string
  light?: string
  dark?: string
  primitives?: string[]
}

interface Problem {
  class: string
  type: string
  message: string
}

interface ComponentUsage {
  dir: string
  files: string[]
  tokens: TokenEntry[]
  arbitrary: string[]
  problems: Problem[]
}

interface UsageReport {
  components: Record<string, ComponentUsage>
}

const report = usage as UsageReport

const groups: Array<{ label: string; kinds: TokenKind[] }> = [
  { label: 'Colors', kinds: ['color'] },
  { label: 'Radius', kinds: ['radius'] },
  { label: 'Typography', kinds: ['text-size', 'font-weight', 'font-family'] },
  { label: 'Spacing', kinds: ['spacing'] },
  { label: 'Border width', kinds: ['border-width'] },
  { label: 'Icon size', kinds: ['icon-size'] },
  { label: 'Var refs', kinds: ['var'] },
]

const chipStyle = {
  display: 'inline-block',
  padding: '2px 6px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-surface-sunken)',
  color: 'var(--color-text-secondary)',
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  lineHeight: '16px',
} as const

function Swatch({ value, label }: { value?: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: '140px' }}>
      <span
        aria-label={`${label}: ${value ?? 'indefinido'}`}
        style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          flex: '0 0 20px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xs)',
          backgroundColor: 'var(--color-surface)',
          backgroundImage:
            'linear-gradient(45deg, var(--color-border-subtle) 25%, transparent 25%), linear-gradient(-45deg, var(--color-border-subtle) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--color-border-subtle) 75%), linear-gradient(-45deg, transparent 75%, var(--color-border-subtle) 75%)',
          backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0',
          backgroundSize: '10px 10px',
        }}
      >
        <span
          style={{ display: 'block', width: '100%', height: '100%', background: value ?? 'transparent' }}
        />
      </span>
      <span>
        <span style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '11px' }}>
          {label}
        </span>
        <code style={{ color: 'var(--color-text-primary)', fontSize: '11px' }}>{value ?? '—'}</code>
      </span>
    </span>
  )
}

function ClassChips({ classes }: { classes: string[] }) {
  const visible = classes.slice(0, 6)
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
      {visible.map((className) => (
        <code key={className} style={chipStyle}>
          {className}
        </code>
      ))}
      {classes.length > visible.length ? (
        <span style={chipStyle}>+{classes.length - visible.length}</span>
      ) : null}
    </span>
  )
}

function TokenTable({ entries }: { entries: TokenEntry[] }) {
  const hasColors = entries.some((entry) => entry.kind === 'color' || entry.kind === 'var')
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: 'var(--color-surface-sunken)', color: 'var(--color-text-secondary)' }}>
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600 }}>Token</th>
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600 }}>
              {hasColors ? 'Valores' : 'Valor'}
            </th>
            {hasColors ? (
              <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600 }}>Primitivos</th>
            ) : null}
            <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600 }}>Classes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.kind}:${entry.token}`} style={{ borderTop: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                <code style={{ color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                  --{entry.token}
                </code>
              </td>
              <td style={{ padding: '12px 16px', verticalAlign: 'top', color: 'var(--color-text-secondary)' }}>
                {entry.kind === 'color' || entry.kind === 'var' ? (
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <Swatch value={entry.light} label="light" />
                    <Swatch value={entry.dark} label="dark" />
                  </span>
                ) : (
                  <code>{entry.value ?? '—'}</code>
                )}
              </td>
              {hasColors ? (
                <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                  {entry.primitives?.length ? (
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {entry.primitives.map((primitive) => (
                        <span key={primitive} style={chipStyle}>
                          {primitive.replace(/^color-/, '')}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-text-disabled)' }}>—</span>
                  )}
                </td>
              ) : null}
              <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                <ClassChips classes={entry.classes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TokenUsagePanel({ title }: { title: string }) {
  const component = report.components[title]
  if (!component) return null

  return (
    <section
      style={{
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', lineHeight: '36px' }}>Tokens usados</h2>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
          {component.tokens.length} tokens · {component.arbitrary.length} arbitrários ·{' '}
          {component.problems.length} problemas
        </span>
      </div>

      {groups.map((group) => {
        const entries = component.tokens.filter((token) => group.kinds.includes(token.kind))
        if (!entries.length) return null
        return (
          <section key={group.label} style={{ marginTop: '24px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '16px', lineHeight: '24px' }}>{group.label}</h3>
            <TokenTable entries={entries} />
          </section>
        )
      })}

      {component.arbitrary.length ? (
        <section style={{ marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', lineHeight: '24px' }}>
            Sem token (valor arbitrário)
          </h3>
          <p style={{ margin: '0 0 8px', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            Valores fixos em px/% que não vêm de um token — normal para dimensões pontuais, mas
            verifique se já existe um token equivalente.
          </p>
          <ClassChips classes={component.arbitrary} />
        </section>
      ) : null}

      <section style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '16px', lineHeight: '24px' }}>Problemas</h3>
        {component.problems.length ? (
          <div
            style={{
              padding: '16px',
              border: '1px solid var(--color-error-border)',
              borderRadius: 'var(--radius-card)',
              background: 'var(--color-error-bg-subtle)',
              color: 'var(--color-error-text)',
            }}
          >
            {component.problems.map((problem) => (
              <div key={`${problem.class}:${problem.type}`} style={{ marginBottom: '8px' }}>
                <code style={{ fontWeight: 600 }}>{problem.class}</code>{' '}
                <span style={{ fontSize: '11px' }}>({problem.type})</span>
                <div style={{ marginTop: '2px', fontSize: '13px' }}>{problem.message}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            ✓ Nenhum problema encontrado
          </div>
        )}
      </section>
    </section>
  )
}
