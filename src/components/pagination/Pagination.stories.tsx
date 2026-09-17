import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Paginação numérica com controles Anterior/Próxima e reticências para intervalos longos.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(5)
    return <Pagination page={page} totalPages={20} onPageChange={setPage} />
  },
}

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination page={page} totalPages={3} onPageChange={setPage} />
  },
}
