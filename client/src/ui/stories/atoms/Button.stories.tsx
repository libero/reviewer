import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { Button } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Button', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Button',
        (): JSX.Element => {
            const type = select('Type', ['primary', 'danger'], 'primary');
            const buttonText = text('Text', 'Button');
            return (
                <Button type={type} onClick={action('clicked')}>
                    {buttonText}
                </Button>
            );
        },
    );
