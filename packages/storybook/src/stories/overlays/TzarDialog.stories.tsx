import type { Meta, StoryObj } from '@storybook/react-vite'
import { BUTTON, DIALOG } from '@tzardom-ui/mocks'
import { TzarButton, TzarDialog } from '@tzardom-ui/react'
import { useState } from 'react'

const meta: Meta<typeof TzarDialog> = {
  title: 'Overlays/TzarDialog',
  component: TzarDialog,
  args: {
    title: DIALOG.title,
  },
}
export default meta

type Story = StoryObj<typeof TzarDialog>

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    const close = () => {
      setOpen(false)
    }

    return (
      <>
        <TzarButton
          onClick={() => {
            setOpen(true)
          }}
        >
          {BUTTON.text}
        </TzarButton>
        <TzarDialog
          {...args}
          open={open}
          onClose={close}
          confirmLabel="Confirm"
          onConfirm={close}
        >
          <p className="text-xs">{DIALOG.text}</p>
        </TzarDialog>
      </>
    )
  },
}

export const Large: Story = {
  ...Interactive,
  args: { size: 'lg' },
}
