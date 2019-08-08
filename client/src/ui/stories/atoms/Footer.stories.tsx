import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { Footer } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/Footer', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'With Text',
        (): JSX.Element => {
            const footerText = text('Text', 'Some text for a footer');
            return <Footer>{footerText}</Footer>;
        },
    )
    .add(
        'With Links',
        (): JSX.Element => {
            const footerText = text('Text', 'Some text for a footer');
            const footerText2 = text('Text2', 'Some more text for a footer');
            return (
                <Footer>
                    <a className="footer__link" href="#">
                        {' '}
                        some link{' '}
                    </a>
                    {footerText}
                    <a className="footer__link" href="#">
                        {' '}
                        some link{' '}
                    </a>
                    {footerText2}
                </Footer>
            );
        },
    );
