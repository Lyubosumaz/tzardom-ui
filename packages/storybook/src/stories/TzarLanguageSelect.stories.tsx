import type { Meta, StoryObj } from '@storybook/react-vite'
import { LANGUAGES, TEST_ID } from '@tzardom-ui/mocks'
import { TzarLanguageSelect } from '@tzardom-ui/react'
import { useState } from 'react'
import { fn } from 'storybook/test'

const [first] = LANGUAGES

const meta: Meta<typeof TzarLanguageSelect> = {
  title: 'ReactComponentLibrary/TzarLanguageSelect',
  component: TzarLanguageSelect,
  args: {
    'data-testid': TEST_ID,
    languages: LANGUAGES,
    value: first.code,
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof TzarLanguageSelect>

export const Default: Story = {}

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(first.code)
    return (
      <TzarLanguageSelect
        {...args}
        value={value}
        onChange={(code) => {
          setValue(code)
          args.onChange?.(code)
        }}
      />
    )
  },
}
