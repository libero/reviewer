import React, { useState, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { TextField } from '../../atoms'
import { Toggle } from '../../molecules';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';

storiesOf('ui | molecules/Toggle', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Toggle',
        (): JSX.Element => {
            const label = text('Label', 'Would you like to toggle the nested content?');
            const content = boolean('Show nested content', false);
            return (
              <Toggle toggleLabel={label} id="testToggle">
                {
                  content && <Fragment>
                    <TextField id="someInput1" labelText="Some Lablel"/>
                    <TextField id="someInput2" labelText="Some Lablel"/>
                    <TextField id="someInput3" labelText="Some Lablel"/>
                  </Fragment>
                }
              </Toggle>
              );
        },
    );