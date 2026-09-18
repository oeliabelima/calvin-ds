import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'Disclosure progressivo para perguntas frequentes e listas de conteúdo expansível.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['q1'])
    return (
      <div style={{ maxWidth: 640 }}>
        <Accordion value={value} onChange={setValue}>
          <AccordionItem value="q1" eyebrow="01 · VIDA ACADÊMICA" title="Como acompanho minha matrícula?">
            Você pode acompanhar o status da matrícula e consultar pendências diretamente no Portal Mackenzie.
          </AccordionItem>
          <AccordionItem value="q2" eyebrow="02 · FINANCEIRO" title="Como emito a segunda via do boleto?">
            A segunda via fica disponível no Portal Mackenzie, na seção Financeiro.
          </AccordionItem>
          <AccordionItem value="q3" title="Item desabilitado" disabled>
            Conteúdo indisponível.
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <div style={{ maxWidth: 640 }}>
        <Accordion type="multiple" value={value} onChange={setValue}>
          <AccordionItem value="q1" title="Pergunta 1">
            Resposta 1.
          </AccordionItem>
          <AccordionItem value="q2" title="Pergunta 2">
            Resposta 2.
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
}
