import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';
import { BurgerMenu } from '../../molecules';
import '../../../core/styles/index.scss';
import { LocationDescriptor } from 'history';
import { MemoryRouter } from 'react-router';

const historyLocation: LocationDescriptor[] = ['/'];

storiesOf('ui | molecules/BurgerMenu', module)
    .addDecorator(withKnobs)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
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
                    <BurgerMenu items={menuItems} />
                </MemoryRouter>
            );
        },
    );
