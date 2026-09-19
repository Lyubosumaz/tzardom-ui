import { Meta, StoryFn } from '@storybook/react'
import { TzarHeader } from '../../generated/components'

export default {
  title: 'ReactComponentLibrary/TzarHeader',
  component: TzarHeader,
} as Meta<typeof TzarHeader>

const Template: StoryFn<typeof TzarHeader> = (args) => <TzarHeader {...args} />

export const Header = Template.bind({})
Header.args = {
  isLogged: true,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  isLogged: false,
}
