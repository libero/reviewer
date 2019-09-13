import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { Checkbox } from '../../atoms';
import '../../../core/styles/index.scss';

const CheckboxComponent = (): JSX.Element => {
    const [checked, setChecked] = useState(false);
    const label = text('Label', 'Check me?');
    const inValid = boolean('Invalid', false);
    const helperText = text('Helper Text', '');
    return (
        <Checkbox
            id="someid"
            onChange={(): void => setChecked(!checked)}
            checked={checked}
            invalid={inValid}
            labelText={label}
            helperText={helperText}
        />
    );
};

storiesOf('ui | atoms/Checkbox', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add('Checkbox', (): JSX.Element => <CheckboxComponent />);
