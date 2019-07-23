import React from 'react'
import { NavLink } from 'react-router-dom'

type NavMenuProps = {
  items?: { url: string, display: string, external?: boolean }[]
}
const NavMenu: React.FC<NavMenuProps> = ({ items = [] }): JSX.Element => (
  <ul>
    {
      items.map(item => (
        <li key={`${item.url}-${item.display}`}>
          {
            item.external ? 
            <a href={item.url}>{item.display}</a> :
            <NavLink to={item.url}>{item.display}</NavLink>
          }
        </li>
      ))
    }
  </ul>
)

export default NavMenu;