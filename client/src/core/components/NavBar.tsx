import React from 'react'
import { AppBar, AppBarIcon} from '../../ui/atoms'

const NavBar: React.FC = (): JSX.Element => (
  <AppBar>
    <AppBarIcon imgSrc="/assets/logo.png" link="/" altText="eLife logo"/>
    App Bar
  </AppBar>
)

export default NavBar