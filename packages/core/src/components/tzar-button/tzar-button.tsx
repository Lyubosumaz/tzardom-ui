import { Component, Prop, State, Event, EventEmitter, h } from '@stencil/core'

export type ThemeColorMode = 'light' | 'dark'

@Component({
  tag: 'tzar-button',
  styleUrl: 'tzar-button.scss',
  shadow: true,
})
export class TzarButton {
  @Prop() label!: string
  @State() theme: ThemeColorMode = 'light'
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
