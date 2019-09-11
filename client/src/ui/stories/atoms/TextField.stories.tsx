import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { TextField } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/TextField', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'TextField',
        (): JSX.Element => {
            const placeholder = text('Placeholder', 'e.g. John Smith');
            const label = text('Label', 'What is your name?');
            const inValid = boolean('Invalid', false);
            const helperText = text('Helper Text', '');
            return (
                <TextField
                    id="someid"
                    placeholder={placeholder}
                    invalid={inValid}
                    labelText={label}
                    helperText={helperText}
                />
            );
        },
    );
