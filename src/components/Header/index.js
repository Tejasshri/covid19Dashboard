import {Link, withRouter} from 'react-router-dom'
import {MdMenuOpen} from 'react-icons/md'
import {IoMdMoon} from 'react-icons/io'
import {BsFillSunFill} from 'react-icons/bs'

import CovidContext from '../../context/CovidContext'
import './index.css'

const Header = () => (
  <CovidContext.Consumer>
    {value => {
      const {isThemeLight, changeTheme} = value
      const headerClassName = isThemeLight ? 'header header-light' : 'header'
      const linkClassName = isThemeLight
        ? 'nav-link nav-link-light'
        : 'nav-link'
      return (
        <div className={headerClassName}>
          <Link to="/" className="logo-link">
            <h1 className="header-logo-title">
              COVID19<span>INDIA</span>
            </h1>
          </Link>

          <ul className="header-link-container">
            <li className="header-link-item">
              <Link to="/" className={linkClassName}>
                Home
              </Link>
            </li>
            <li className="header-link-item">
              <Link to="/about" className={linkClassName}>
                About
              </Link>
            </li>
          </ul>
          <button
            className="theme-button"
            type="button"
            onClick={() => changeTheme()}
          >
            {isThemeLight ? (
              <IoMdMoon size="30" color="#000000" />
            ) : (
              <BsFillSunFill size="30" color="#ffffff" />
            )}
          </button>
          <button type="button" className="mobile-menu-button">
            <MdMenuOpen
              size="30"
              color={isThemeLight ? '#000000' : '#ffffff'}
            />
          </button>
        </div>
      )
    }}
  </CovidContext.Consumer>
)

export default withRouter(Header)
