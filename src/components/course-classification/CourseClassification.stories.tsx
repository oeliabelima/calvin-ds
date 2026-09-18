import type { Meta, StoryObj } from '@storybook/react'
import { CourseClassification } from './CourseClassification'

const meta: Meta<typeof CourseClassification> = {
  title: 'Components/CourseClassification',
  component: CourseClassification,
  parameters: {
    docs: {
      description: {
        component:
          'Classificação acadêmica opcional para cards de curso. Agency alterna MEC/ENADE; Display alterna estrelas ou nota.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof CourseClassification>

export const Stars: Story = {
  args: { agency: 'MEC', display: 'stars', value: 5 },
}

export const Grade: Story = {
  args: { agency: 'ENADE', display: 'grade', score: '5' },
}

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <CourseClassification agency="MEC" display="stars" value={5} />
      <CourseClassification agency="ENADE" display="stars" value={3} />
      <CourseClassification agency="MEC" display="grade" score="5" />
      <CourseClassification agency="ENADE" display="grade" score="4" />
    </div>
  ),
}
