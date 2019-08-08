import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { AppBarIcon } from '../../atoms';
import Logo from '../../../core/assets/elife-logo.png';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/AppBarIcon', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'primary',
        (): JSX.Element => {
            const altText = text('Alt Text', 'eLife Logo');
            return <AppBarIcon imgSrc={Logo} link="#" altText={altText} />;
        },
    );
