import type { Meta, StoryObj } from '@storybook/react'
import { CardCourse } from './CardCourse'
import { CourseClassification } from '../course-classification'

const meta: Meta<typeof CardCourse> = {
  title: 'Components/CardCourse',
  component: CardCourse,
  parameters: {
    docs: {
      description: {
        component:
          'Card especializado para cursos. Mantém Type e State do Card base e inclui classificação opcional MEC/ENADE em estrelas ou nota.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof CardCourse>

const baseArgs = {
  eyebrow: 'MACKENZIE · EXPERIÊNCIA',
  title: 'Uma experiência com mais contexto',
  description: 'Conteúdo editorial com hierarquia clara, leitura confortável e comportamento responsivo.',
  meta: '5 min de leitura',
  action: 'Conhecer conteúdo',
}

export const Text: Story = {
  args: {
    ...baseArgs,
    classification: <CourseClassification agency="MEC" display="stars" value={5} />,
  },
}

export const Media: Story = {
  args: {
    ...baseArgs,
    classification: <CourseClassification agency="MEC" display="stars" value={5} />,
    media: (
      <img
        alt="Campus Mackenzie"
        src="https://placehold.co/360x200"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
  },
}

export const ClassificationVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <CardCourse {...baseArgs} classification={<CourseClassification agency="MEC" display="stars" value={5} />} />
      <CardCourse {...baseArgs} classification={<CourseClassification agency="ENADE" display="grade" score="5" />} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    classification: <CourseClassification agency="MEC" display="stars" value={5} />,
    disabled: true,
  },
}
