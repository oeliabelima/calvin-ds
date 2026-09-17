import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders each item', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/cursos">Cursos</BreadcrumbItem>
        <BreadcrumbItem current>Graduação</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Cursos')).toBeInTheDocument()
    expect(screen.getByText('Graduação')).toBeInTheDocument()
  })

  it('inserts a separator between items but not after the last one', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem current>Cursos</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(screen.getAllByText('/')).toHaveLength(1)
  })

  it('marks the current item with aria-current and renders it as a span, not a link', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem current>Graduação</BreadcrumbItem>
      </Breadcrumb>,
    )
    const current = screen.getByText('Graduação')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current.tagName).toBe('SPAN')
  })

  it('renders non-current items as links', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(screen.getByText('Início').tagName).toBe('A')
  })
})
