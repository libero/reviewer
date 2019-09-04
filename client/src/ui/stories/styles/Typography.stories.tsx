import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import '../../../core/styles/index.scss';

storiesOf('ui | styles/Typography', module)
    .addDecorator(centered)
    .add(
        'Body',
        (): JSX.Element => {
            return (
                <div>
                    <p className="typography__body typography__body--primary">
                        Body Primary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="typography__body typography__body--secondary">
                        Body Secondary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="typography__body typography__body--strong">
                        Body Strong: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a className="typography__body typography__body--link" href="">
                        Body Link: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </a>
                </div>
            );
        },
    )
    .add(
        'Small',
        (): JSX.Element => {
            return (
                <div>
                    <p className="typography__small typography__small--primary">
                        Small Primary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="typography__small typography__small--secondary">
                        Small Secondary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="typography__small typography__small--strong">
                        Small Strong: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a className="typography__small typography__small--link" href="">
                        Small Link: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </a>
                </div>
            );
        },
    )
    .add(
        'Serif',
        (): JSX.Element => {
            return (
                <div>
                    <p className="typography__serif typography__serif--primary">
                        Serif Primary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a className="typography__serif typography__serif--link" href="">
                        Serif Link: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </a>
                </div>
            );
        },
    )
    .add(
        'Heading',
        (): JSX.Element => {
            return (
                <div>
                    <h1 className="typography__heading typography__heading--h1">
                        Heading H1: Lorem ipsum dolor sit amet
                    </h1>
                    <h2 className="typography__heading typography__heading--h2">
                        Heading H2: Lorem ipsum dolor sit amet
                    </h2>
                    <h3 className="typography__heading typography__heading--h3">
                        Heading H3: Lorem ipsum dolor sit amet
                    </h3>
                    <h4 className="typography__heading typography__heading--h4">
                        Heading H4: Lorem ipsum dolor sit amet
                    </h4>
                </div>
            );
        },
    )
    .add(
        'Label',
        (): JSX.Element => {
            return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="typography__label typography__label--primary">
                        Label Primary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>
                    <span className="typography__label typography__label--secondary">
                        Label Secondary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>
                    <span className="typography__label typography__label--error">
                        Label Error: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>
                </div>
            );
        },
    )
    .add(
        'Xsmall',
        (): JSX.Element => {
            return (
                <div>
                    <a className="typography__xsmall typography__xsmall--link" href="">
                        Xsmall Link: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </a>
                </div>
            );
        },
    );
