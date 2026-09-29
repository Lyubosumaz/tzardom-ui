import type { EventEmitter } from '@stencil/core'
import { Component, Prop, State, Event, h } from '@stencil/core'
import { ThemeColorMode } from '@tzardom-ui/types'

@Component({
  tag: 'tzar-button',
  styleUrl: 'tzar-button.scss',
  shadow: true,
})
export class TzarButton {
  @Prop() label!: string
  @State() theme: ThemeColorMode = ThemeColorMode.LIGHT
  @Event() themeChange!: EventEmitter<ThemeColorMode>

  private onClick = () => {
    this.theme =
      this.theme === ThemeColorMode.LIGHT
        ? ThemeColorMode.DARK
        : ThemeColorMode.LIGHT
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
