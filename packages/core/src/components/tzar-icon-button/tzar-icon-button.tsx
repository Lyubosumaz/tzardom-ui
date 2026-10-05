import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'tzar-icon-button',
  shadow: true,
})
export class TzarIconButton {
  @Prop() label!: string
  @Prop({ reflect: true }) disabled = false

  render() {
    return (
      <button
        type="button"
        part="button"
        class="icon-button"
        aria-label={this.label}
        disabled={this.disabled}
      >
        <slot />
      </button>
    )
  }
}
