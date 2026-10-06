import type { EventEmitter } from '@stencil/core'
import { Component, Element, Event, Listen, Prop, h } from '@stencil/core'

@Component({
  tag: 'tzar-dropdown',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class TzarDropdown {
  @Element() el!: HTMLElement
  @Prop({ mutable: true, reflect: true }) open = false
  @Prop() label?: string
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
    return (
      <div class="relative inline-block">
        <button
          type="button"
          part="trigger"
          class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft"
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls="menu"
          aria-label={this.label}
          onClick={this.onTriggerClick}
        >
          <slot name="trigger" />
        </button>
        <div
          id="menu"
          part="menu"
          class="absolute right-0 z-10 mt-2 w-32 rounded-md border border-border-subtle bg-background py-1 text-xs shadow-md"
          hidden={!this.open}
        >
          <slot />
        </div>
      </div>
    )
  }
}
