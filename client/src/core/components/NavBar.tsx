import React from 'react';
import { AppBar, AppBarIcon, NavMenu } from '../../ui/atoms';
import { ProfileDropdown } from '../../ui/molecules';
import Logo from '../assets/elife-logo.png';

const NavBar: React.FC = (): JSX.Element => (
    <AppBar>
        <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
        <NavMenu
            items={[
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
            ]}
        />
        <ProfileDropdown name="Name" />
    </AppBar>
);

export default NavBar;
