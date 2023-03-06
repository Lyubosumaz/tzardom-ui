import React, { Fragment } from 'react'
import './SPHeader.scss'

const SPHeader = () => {
  const isLogged = true

  // holder for the additional button classes
  const additionalClasses = 'main-site-functionalities'

  return (
    <header className="site-header-2">
      <nav className="site-navigation">
        <ul>
          <li className="nav-container-left">
            <ul>
              {isLogged ? (
                // <li>{initializedNavBtn('forest-runner', 'Forest Runner', additionalClasses)}</li>
                <li>
                  <button>Forest Runner</button>
                </li>
              ) : (
                // TODO: extend games and add puzzles
                // <Fragment>
                //     <li>{initializedNavBtn(forestRunner, null, additionalClasses)}</li>
                //     <li>{initializedNavBtn('puzzles', null, additionalClasses)}</li>
                // </Fragment>
                // <li>{initializedNavBtn('home', null, additionalClasses)}</li>
                <li>
                  <button>Home</button>
                </li>
              )}
              {/* <li>{initializedNavBtn('house-of-fame', 'House of Fame')}</li> */}
              <li>
                <button>House of Fame</button>
              </li>
            </ul>
          </li>

          <li className="nav-container-right">
            <ul>
              {isLogged ? (
                <Fragment>
                  {/* <li>{initializedNavBtn('social')}</li> */}
                  {/* <li>{initializedNavBtn('profile')}</li> */}
                  {/* <li>{initializedNavBtn('logout')}</li> */}
                  <li>
                    <button>Social</button>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  {/* <li>{initializedNavBtn('register')}</li> */}
                  {/* <li>{initializedNavBtn('login')}</li> */}
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
