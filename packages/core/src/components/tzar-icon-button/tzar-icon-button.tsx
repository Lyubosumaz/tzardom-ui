import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'tzar-icon-button',
  styleUrl: '../../tailwind.css',
  shadow: { delegatesFocus: true },
})
export class TzarIconButton {
  @Prop() label!: string
  @Prop({ reflect: true }) disabled = false

  render() {
    return (
      <button
        type="button"
        part="button"
        class="inline-flex items-center gap-1.5 rounded-full p-2 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft"
        aria-label={this.label}
        disabled={this.disabled}
      >
        <slot />
      </button>
    )
  }
}
