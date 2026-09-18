import { Fragment } from 'react'
import './SPHeader.scss'

const SPHeader = () => {
  const isLogged = true

  const additionalClasses = 'main-site-functionalities'

  return (
    <header className="site-header-2">
      <nav className="site-navigation">
        <ul>
          <li className="nav-container-left">
            <ul>
              {isLogged ? (
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

          <li className="nav-container-right">
            <ul>
              {isLogged ? (
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

export default SPHeader
