import { Meta, StoryFn } from '@storybook/react'
import TzarHeader from './TzarHeader'

export default {
  title: 'ReactComponentLibrary/TzarHeader',
  component: TzarHeader,
} as Meta<typeof TzarHeader>

const Template: StoryFn<typeof TzarHeader> = () => <TzarHeader />

export const Header = Template.bind({})
