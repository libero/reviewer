import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { ImageWithAttribution } from '../../atoms';
import Image from '../../../core/assets/welcome.jpg';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/ImageWithAttribution', module)
    .addDecorator(centered)
    .add(
        'Button',
        (): JSX.Element => {
            return <ImageWithAttribution image={Image} artistKey="some-key" artistUrl="http://www.google.com" />;
        },
    );
