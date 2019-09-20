import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { UploadIcon } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/UploadIcon', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'UploadIcon',
        (): JSX.Element => {
            return <UploadIcon />;
        },
    );
