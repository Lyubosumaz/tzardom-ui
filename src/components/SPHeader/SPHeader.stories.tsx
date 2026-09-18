import { Meta, StoryFn } from '@storybook/react'

import SPHeader from './SPHeader'

export default {
  title: 'ReactComponentLibrary/SPHeader',
  component: SPHeader,
} as Meta<typeof SPHeader>

const Template: StoryFn<typeof SPHeader> = () => <SPHeader />

export const Header = Template.bind({})
