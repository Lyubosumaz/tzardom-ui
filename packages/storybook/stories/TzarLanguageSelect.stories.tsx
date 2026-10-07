import type { Meta, StoryObj } from '@storybook/react-vite'
import { TzarLanguageSelect } from '@tzardom-ui/react'
import { useState } from 'react'
import { fn } from 'storybook/test'

const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'bg', short: 'BG', label: 'Bulgarian' },
  { code: 'ka', short: 'KA', label: 'Georgian' },
]

const meta: Meta<typeof TzarLanguageSelect> = {
  title: 'ReactComponentLibrary/TzarLanguageSelect',
  component: TzarLanguageSelect,
  args: {
    languages: LANGUAGES,
    value: 'en',
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
    const [value, setValue] = useState('en')
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
