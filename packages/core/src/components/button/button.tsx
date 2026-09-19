import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core'

export type ThemeColorMode = 'light' | 'dark'

@Component({
  tag: 'tzr-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  /** Text shown inside the button. */
  @Prop() label!: string

  /** Current theme; the button flips this and reports the change. */
  @State() theme: ThemeColorMode = 'light'

  /** Fired when the button is clicked, with the new theme value. */
  @Event() themeChange!: EventEmitter<ThemeColorMode>

  private onClick = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    this.themeChange.emit(this.theme)
  }

  render() {
    return (
      <button class="header-button" onClick={this.onClick}>
        <span>{this.label}</span>
      </button>
    )
  }
}
