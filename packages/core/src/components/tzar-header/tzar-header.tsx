import { Component, Prop, Fragment, h } from '@stencil/core'

@Component({
  tag: 'tzar-header',
  styleUrl: 'tzar-header.scss',
  shadow: true,
})
export class TzarHeader {
  /** Whether to show the logged-in nav items. */
  @Prop() isLogged: boolean = true

  render() {
    return (
      <header class="site-header-2">
        <nav class="site-navigation">
          <ul>
            <li class="nav-container-left">
              <ul>
                {this.isLogged ? (
                  <li>
                    <button>Forest Runner</button>
                  </li>
                ) : (
                  <li>
                    <button>Home</button>
                  </li>
                )}
                <li>
                  <button>House of Fame</button>
                </li>
              </ul>
            </li>

            <li class="nav-container-right">
              <ul>
                {this.isLogged ? (
                  <Fragment>
                    <li>
                      <button>Social</button>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <button>Register</button>
                    </li>
                  </Fragment>
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
