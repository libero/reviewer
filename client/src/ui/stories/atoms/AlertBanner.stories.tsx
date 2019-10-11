import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Banner } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Banner', module)
    .addDecorator(withKnobs)
    .add(
        'Banner',
        (): JSX.Element => {
            const content = text('Content', 'Maximum 6 people selected');
            return <Banner>{content}</Banner>;
        },
    );
