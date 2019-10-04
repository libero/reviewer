import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { SelectField } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/SelectField', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'SelectField',
        (): JSX.Element => {
            const label = text('Label', 'What is your favourite animal?');
            const inValid = boolean('Invalid', false);
            const helperText = text('Helper Text', '');
            const placeholder = text('Placeholder', '');
            const values = [
                { label: 'Squirrel', value: 'squirrel' },
                { label: 'Cat', value: 'cat' },
                { label: 'Dog', value: 'dog' },
                { label: 'Ferret', value: 'ferret' },
                { label: 'Rabbit', value: 'bunny' },
                { label: 'Unicorn', value: 'unicorn' },
            ];
            return (
                <SelectField
                    id="someid"
                    invalid={inValid}
                    labelText={label}
                    helperText={helperText}
                    values={values}
                    placeholder={placeholder}
                    onChange={action('changed')}
                />
            );
        },
    )
    .add(
        'MultiSelectField',
        (): JSX.Element => {
            const label = text('Label', 'What is your favourite animal?');
            const inValid = boolean('Invalid', false);
            const helperText = text('Helper Text', '');
            const placeholder = text('Placeholder', '');
            const values = [
                { label: 'Squirrel', value: 'squirrel' },
                { label: 'Cat', value: 'cat' },
                { label: 'Dog', value: 'dog' },
                { label: 'Ferret', value: 'ferret' },
                { label: 'Rabbit', value: 'bunny' },
                { label: 'Unicorn', value: 'unicorn' },
            ];
            return (
                <SelectField
                    id="someid"
                    invalid={inValid}
                    labelText={label}
                    helperText={helperText}
                    values={values}
                    placeholder={placeholder}
                    onChange={action('changed')}
                    multi={true}
                />
            );
        },
    );
