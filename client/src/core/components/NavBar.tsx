import React from 'react';
import { AppBar, AppBarIcon, NavMenu } from '../../ui/atoms';
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
        App Bar
    </AppBar>
);

export default NavBar;
