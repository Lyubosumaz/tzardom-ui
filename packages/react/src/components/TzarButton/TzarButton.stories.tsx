import { Meta, StoryFn } from '@storybook/react'
import { TzarButton } from '../../generated/components'

export default {
  title: 'ReactComponentLibrary/TzarButton',
  component: TzarButton,
} as Meta<typeof TzarButton>

const Template: StoryFn<typeof TzarButton> = (args) => <TzarButton {...args} />

export const HelloWorld = Template.bind({})
HelloWorld.args = {
  label: 'Click me!',
}
