import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';
import { Menu } from '../../molecules';
import '../../../core/styles/index.scss';
import { LocationDescriptor } from 'history';
import { MemoryRouter } from 'react-router';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';

const historyLocation: LocationDescriptor[] = ['/'];

storiesOf('ui | molecules/Menu', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Menu',
        (): JSX.Element => {
            const menuItems = object('Menu Items', [
                {
                    display: 'Here',
                    url: '/?path=/story/ui-molecules-menu--menu',
                    external: true,
                },
                {
                    display: 'Author guide',
                    url: '/author-guide',
                    external: true,
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
                    <Menu onLinkClick={action('Internal Link')} items={menuItems} />
                </MemoryRouter>
            );
        },
    );
