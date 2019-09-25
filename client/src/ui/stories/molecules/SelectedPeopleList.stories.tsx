import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { SelectedPeopleList } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/SelectedPeopleList', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add(
        'SelectedPeopleList',
        (): JSX.Element => {
            const people = object('Menu Items', [
                {
                  id: '1',
                  name: 'Name 1',
                  institution: 'Institution 1',
                  tags: ['Tag 1', 'Tage 2', 'Tag 3']
                },
                {
                  id: '2',
                  name: 'Name 2',
                  institution: 'Institution 2',
                  tags: ['Tag 1', 'Tage 2', 'Tag 3']
              },
              {
                id: '3',
                name: 'Name 3',
                institution: 'Institution 3',
                tags: ['Tag 1', 'Tage 2', 'Tag 3']
              },
            ]);
            return (
                <SelectedPeopleList people={people} />
            );
        },
    );
