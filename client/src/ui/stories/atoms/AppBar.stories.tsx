import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';
import { AppBar, AppBarIcon } from '../../atoms';
import { BurgerMenu, Menu } from '../../molecules';
import { LocationDescriptor } from 'history';
import { MemoryRouter } from 'react-router';
import Logo from '../../../core/assets/elife-logo.png';
import '../../../core/styles/index.scss';

const historyLocation: LocationDescriptor[] = ['/'];

storiesOf('ui | atoms/AppBar', module)
    .addDecorator(withKnobs)
    .add(
        'AppBar',
        (): JSX.Element => {
            return <AppBar />;
        },
    )
    .add(
        'With Components',
        (): JSX.Element => {
            const menuItems = object('Menu Items', [
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
            ]);
            return (
                <MemoryRouter initialEntries={historyLocation}>
                    <AppBar>
                        <BurgerMenu items={menuItems} />
                        <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
                        <Menu items={menuItems} />
                    </AppBar>
                </MemoryRouter>
            );
        },
    );
