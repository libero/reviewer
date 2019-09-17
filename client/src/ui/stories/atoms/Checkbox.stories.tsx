import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import { Checkbox } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Checkbox', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Checkbox',
        (): JSX.Element => {
            const label = text('Label', 'Check me?');
            const inValid = boolean('Invalid', false);
            const helperText = text('Helper Text', '');
            return (
                <Checkbox
                    id="someid"
                    onChange={(event: React.FormEvent<HTMLInputElement>): void => action('checked')(event)}
                    invalid={inValid}
                    labelText={label}
                    helperText={helperText}
                />
            );
        },
    );
