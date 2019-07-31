import React from 'react';
import { AppBar, AppBarIcon } from '../../ui/atoms';
import { ProfileDropdown, NavMenu, BurgerMenu } from '../../ui/molecules';
import Logo from '../assets/elife-logo.png';
const menuItems = [
    {
        display: 'Dashboard',
        url: '/',
    },
    {
        display: 'Author guide',
        url: '/author-guide',
    },
    {
        display: 'Reviewer guide',
        url: '/reviewer-guide',
    },
    {
        display: 'Contact us',
        url: '/contact-us',
    },
];

const NavBar: React.FC = (): JSX.Element => (
    <AppBar>
        <BurgerMenu>
            <NavMenu items={menuItems} vertical />
        </BurgerMenu>
        <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
        <NavMenu items={menuItems} />
        <ProfileDropdown name="Name" />
    </AppBar>
);

export default NavBar;
