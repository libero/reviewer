import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { PersonInfo } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/PersonInfo', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'PersonInfo',
        (): JSX.Element => {
            const name = text('Name', 'Bob Ross');
            const institution = text('Institution', 'Little Happy Trees');
            const expertise = text('Expertise', 'Happiness,Painting,Trees').split(',');
            const researchFocuses = text('Research Focuses', 'Happy,Little,Trees').split(',');
            return (
                <PersonInfo name={name} institution={institution} expertises={expertise} focuses={researchFocuses} />
            );
        },
    );
