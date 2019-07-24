import React from 'react'
import { NavLink } from 'react-router-dom'

type NavMenuProps = {
  items?: { url: string, display: string, external?: boolean }[]
}
const NavMenu: React.FC<NavMenuProps> = ({ items = [] }): JSX.Element => (
  <ul className='nav-menu'>
    {
      items.map(item => (
        <li className='nav-menu__item' key={`${item.url}-${item.display}`}>
          {
            item.external ? 
            <a className='nav-menu__link' href={item.url}>{item.display}</a> :
            <NavLink className='nav-menu__link' activeClassName='nav-menu__link--active' exact to={item.url}>{item.display}</NavLink>
          }
        </li>
      ))
    }
  </ul>
)

export default NavMenu;