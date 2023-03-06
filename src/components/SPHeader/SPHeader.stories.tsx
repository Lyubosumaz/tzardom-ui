import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SPHeader from './SPHeader'

export default {
  title: 'ReactComponentLibrary/SPHeader',
  component: SPHeader,
} as ComponentMeta<typeof SPHeader>

const Template: ComponentStory<typeof SPHeader> = (args) => <SPHeader />

export const Header = Template.bind({})
// SPHeader.args = {
// };
