import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';
import { SearchField } from '../../molecules';
import '../../../core/styles/index.scss';

storiesOf('ui | molecules/SeachField', module)
    .addDecorator(centered)
    .add(
        'SearchField',
        (): JSX.Element => {
            const onChange = (event: React.FormEvent<HTMLInputElement>): Promise<void> => {
                action('changed')(event.currentTarget.value);
                return Promise.resolve();
            };
            return <SearchField id="someid" onChange={onChange} />;
        },
    );
