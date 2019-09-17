import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs, boolean, number } from '@storybook/addon-knobs';
import { TextField } from '../../atoms';
import { ExcludedToggle } from '../../molecules';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';

storiesOf('ui | molecules/ExcludedToggle', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ExcludedToggle',
        (): JSX.Element => {
            const togglePrefixText = text('Toggle prefix text', 'Would you like to ');
            const toggleActionText = text('Toggle action text', 'exclude a senior editor');
            const panelHeading = text('Panel heading', 'Excluded a senior editor');
            const toggleContent = boolean('Display inner content', false);
            const containerWidth = number('Container width', 600);
            return (
                <div style={{ width: `${containerWidth}px` }}>
                    <ExcludedToggle
                        togglePrefixText={togglePrefixText}
                        toggleActionText={toggleActionText}
                        panelHeading={panelHeading}
                    >
                        {toggleContent && (
                            <Fragment>
                                <TextField id="someInput1" labelText="Some Lablel" />
                                <TextField id="someInput2" labelText="Some Lablel" />
                                <TextField id="someInput3" labelText="Some Lablel" />
                            </Fragment>
                        )}
                    </ExcludedToggle>
                </div>
            );
        },
    );
