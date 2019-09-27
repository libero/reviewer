import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { Pod } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Pod', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add(
        'Pod',
        (): JSX.Element => {
            const innerText = text('Children text', 'Hello');
            const buttonText = text('Button text for accessibility', 'A button');
            const icon = select('Type', ['Delete', 'Add', 'SwapHoriz'], 'Add');
            const containerWidth = text('Container Width', '300px');
            const invalid = boolean('Invalid', false);

            const getIcon = (): JSX.Element => {
                switch (icon) {
                    case 'Delete':
                        return <Delete />;
                    case 'Add':
                        return <Add />;
                    case 'SwapHoriz':
                        return <SwapHoriz />;
                }
                return null;
            };
            return (
                <div style={{ width: containerWidth }}>
                    <Pod buttonIcon={getIcon()} buttonText={buttonText} onClick={action('onClick')} invalid={invalid}>
                        {innerText}
                    </Pod>
                </div>
            );
        },
    );
