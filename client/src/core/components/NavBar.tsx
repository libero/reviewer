import React from 'react'
import { AppBar, AppBarIcon} from '../../ui/atoms'
import Logo from '../assets/elife-logo.png';

const NavBar: React.FC = (): JSX.Element => (
  <AppBar>
    <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo"/>
    App Bar
  </AppBar>
)

export default NavBar