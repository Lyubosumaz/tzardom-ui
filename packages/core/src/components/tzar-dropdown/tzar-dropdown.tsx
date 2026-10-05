import type { EventEmitter } from '@stencil/core'
import { Component, Element, Event, Listen, Prop, h } from '@stencil/core'

@Component({
  tag: 'tzar-dropdown',
  shadow: true,
})
export class TzarDropdown {
  @Element() el!: HTMLElement
  @Prop({ mutable: true, reflect: true }) open = false
  @Prop() label?: string
  @Prop() menuRole = 'listbox'
  @Event() openChange!: EventEmitter<boolean>

  private setOpen(open: boolean) {
    if (this.open === open) {
      return
    }
    this.open = open
    this.openChange.emit(open)
  }

  private onTriggerClick = () => {
    this.setOpen(!this.open)
  }

  @Listen('click', { target: 'document' })
  onDocumentClick(event: MouseEvent) {
    if (this.open && !event.composedPath().includes(this.el)) {
      this.setOpen(false)
    }
  }

  @Listen('keydown', { target: 'document' })
  onDocumentKeydown(event: KeyboardEvent) {
    if (this.open && event.key === 'Escape') {
      this.setOpen(false)
      this.el.shadowRoot?.querySelector('button')?.focus()
    }
  }

  render() {
    return [
      <button
        type="button"
        part="trigger"
        aria-haspopup={this.menuRole}
        aria-expanded={this.open ? 'true' : 'false'}
        aria-label={this.label}
        onClick={this.onTriggerClick}
      >
        <slot name="trigger" />
      </button>,
      this.open && (
        <div part="menu" role={this.menuRole}>
          <slot />
        </div>
      ),
    ]
  }
}
