import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '../components/Login';
import '../../core/styles/index.scss';

storiesOf('Login | Components/Login', module).add(
    'Login Page',
    (): JSX.Element => {
        return <Login />;
    },
);
