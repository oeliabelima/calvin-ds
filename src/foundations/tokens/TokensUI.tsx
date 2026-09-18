import { useState, type ChangeEvent, type ReactNode } from 'react'

type PageShellProps = {
  title: string
  description: string
  children: ReactNode
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 32 }}>
          <h1
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--text-3xl)',
              lineHeight: 'var(--text-3xl--line-height)',
              margin: '0 0 8px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--text-base--line-height)',
              margin: 0,
              maxWidth: 760,
            }}
          >
            {description}
          </p>
        </header>
        {children}
      </div>
    </main>
  )
}

type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <input
      aria-label={placeholder}
      onChange={handleChange}
      placeholder={placeholder}
      type="search"
      value={value}
      style={{
        width: '100%',
        maxWidth: 420,
        boxSizing: 'border-box',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-input)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        font: 'inherit',
        padding: '10px 12px',
        outlineColor: 'var(--color-border-focus)',
      }}
    />
  )
}

type SectionProps = {
  title: string
  count: number
  children: ReactNode
}

export function Section({ title, count, children }: SectionProps) {
  return (
    <section
      style={{
        padding: '32px 0',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--text-xl--line-height)',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span
          style={{
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-surface-sunken)',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-xs)',
            lineHeight: 'var(--text-xs--line-height)',
            padding: '2px 8px',
          }}
        >
          {count}
        </span>
      </div>
      {children}
    </section>
  )
}

export function isColorValue(value: string): boolean {
  const normalized = value.trim()
  return (
    /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(
      normalized,
    ) || /^(?:rgb|rgba|hsl)\(/i.test(normalized)
  )
}

function hasAlpha(value: string): boolean {
  const normalized = value.trim()
  return (
    /^rgba\(/i.test(normalized) ||
    /^#[\da-f]{4}$/i.test(normalized) ||
    /^#[\da-f]{8}$/i.test(normalized)
  )
}

type SwatchProps = { value: string; size?: number }

export function Swatch({ value, size = 40 }: SwatchProps) {
  const checkerboard =
    'conic-gradient(#d6d2d2 25%, #ffffff 0 50%, #d6d2d2 0 75%, #ffffff 0) 0 0 / 12px 12px'

  return (
    <span
      aria-label={`Color ${value}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        flex: '0 0 auto',
        width: size,
        height: size,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        background: hasAlpha(value) ? checkerboard : value,
      }}
    >
      {hasAlpha(value) ? (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: value,
          }}
        />
      ) : null}
    </span>
  )
}

type CopyChipProps = { text: string; label?: string }

export function CopyChip({ text, label }: CopyChipProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(text).catch(() => undefined)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={copy}
      title={`Copiar ${text}`}
      type="button"
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        lineHeight: 'var(--text-xs--line-height)',
        padding: '4px 8px',
      }}
    >
      {copied ? 'Copiado' : (label ?? text)}
    </button>
  )
}
