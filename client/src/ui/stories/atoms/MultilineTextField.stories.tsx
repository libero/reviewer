import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { MultilineTextField } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/MultilineTextField', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'MultilineTextField',
        (): JSX.Element => {
            const placeholder = text('Placeholder', 'e.g. John Smith');
            const label = text('Label', 'What is your name?');
            const inValid = boolean('Invalid', false);
            const helperText = text('Helper Text', '');
            const rows = number('Rows', 3);
            const cols = number('Columns', 50);
            return (
                <MultilineTextField
                    id="someid"
                    placeholder={placeholder}
                    invalid={inValid}
                    rows={rows}
                    cols={cols}
                    labelText={label}
                    helperText={helperText}
                />
            );
        },
    );
