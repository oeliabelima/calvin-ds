import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsItem } from './Tabs'

describe('Tabs', () => {
  it('renders each tab', () => {
    render(
      <Tabs value="overview" onChange={() => {}}>
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="details">Detalhes</TabsItem>
      </Tabs>,
    )
    expect(screen.getByText('Visão geral')).toBeInTheDocument()
    expect(screen.getByText('Detalhes')).toBeInTheDocument()
  })

  it('marks the active tab as aria-selected', () => {
    render(
      <Tabs value="overview" onChange={() => {}}>
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="details">Detalhes</TabsItem>
      </Tabs>,
    )
    expect(screen.getByText('Visão geral')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Detalhes')).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange with the clicked tab value', async () => {
    const onChange = vi.fn()
    render(
      <Tabs value="overview" onChange={onChange}>
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="details">Detalhes</TabsItem>
      </Tabs>,
    )
    await userEvent.click(screen.getByText('Detalhes'))
    expect(onChange).toHaveBeenCalledWith('details')
  })

  it('does not call onChange for a disabled tab', async () => {
    const onChange = vi.fn()
    render(
      <Tabs value="overview" onChange={onChange}>
        <TabsItem value="overview">Visão geral</TabsItem>
        <TabsItem value="details" disabled>
          Detalhes
        </TabsItem>
      </Tabs>,
    )
    await userEvent.click(screen.getByText('Detalhes'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
