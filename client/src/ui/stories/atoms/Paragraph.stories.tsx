import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { Paragraph } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Paragraph', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Paragraph',
        (): JSX.Element => {
            const secondary = boolean('Secondary?', false);
            const type = select('Type', ['reading', 'writing', 'small'], 'reading');
            const paragraphText = text('Text', 'Some text for a paragraph');
            return (
                <Paragraph type={type} secondary={secondary}>
                    {paragraphText}
                </Paragraph>
            );
        },
    );
