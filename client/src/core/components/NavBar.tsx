import React from 'react';
import { AppBar, AppBarIcon } from '../../ui/atoms';
import { ProfileDropdown, Menu, BurgerMenu } from '../../ui/molecules';
import Logo from '../assets/elife-logo.png';

const menuItems = [
    {
        display: 'common:navbar.dashboard',
        url: '/',
    },
    {
        display: 'common:navbar.author-guide',
        url: '/author-guide',
    },
    {
        display: 'common:navbar.reviewer-guide',
        url: '/reviewer-guide',
    },
    {
        display: 'common:navbar.contact-us',
        url: '/contact-us',
    },
];

const NavBar: React.FC = (): JSX.Element => (
    <AppBar>
        <BurgerMenu items={menuItems} />
        <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
        <Menu items={menuItems} />
        <ProfileDropdown name="Name" />
    </AppBar>
);

export default NavBar;
