import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Graph, { data } from './Graph'

export default {
  title: 'tzardom-ui/Graph',
  component: Graph,
} as ComponentMeta<typeof Graph>

const Template: ComponentStory<typeof Graph> = (args) => <Graph {...args} />

export const ClickMe = Template.bind({})
ClickMe.args = {
  data: data,
}
