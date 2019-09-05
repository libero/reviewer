import React from 'react';
import { TwoColumnLayout, Paragraph, Button } from '../../ui/atoms';
import Image from '../../core/assets/welcome.jpg';

const Login = (): JSX.Element => {
    return (
        <div className="login-page">
            <TwoColumnLayout>
                <div>
                    <h1 className="typography__heading typography__heading--h1">Welcome!</h1>

                    <div className="login-page__text">
                        <Paragraph type="writing">
                            The leading scientists behind eLife are committed to rapid, fair, and constructive review of
                            academic research.
                        </Paragraph>
                        <Paragraph type="writing">
                            We welcome submissions of the highest scientific standards and importance in all areas of
                            importance in all areas of the life and biomedical sciences.
                        </Paragraph>
                        <Paragraph type="writing">
                            You can read more in our{' '}
                            <a
                                className="typography typography__body--link"
                                href="https://reviewer.elifesciences.org/author-guide"
                            >
                                author guide
                            </a>
                            .
                        </Paragraph>
                    </div>

                    <div className="login-page__buttons">
                        <a className="login-page__buttons--orcid" href={'/'}>
                            <Button type="orcid">Login with ORCID</Button>
                        </a>
                        <Paragraph type="writing">
                            No ORCID?{' '}
                            <a className="typography typography__body--link" href="https://orcid.org/register">
                                Sign up
                            </a>{' '}
                            now.
                        </Paragraph>
                    </div>
                </div>
                <div className="login-page__image">
                    <img className="login-page__image--image" alt="Login Page Art" src={Image} />
                    <p className="login-page__image--credit">
                        Illustration by <a href="http://www.davidebonazzi.com/">Davide Bonazzi</a>
                    </p>
                </div>
            </TwoColumnLayout>
            <Paragraph type="footer">
                Read our{' '}
                <a
                    className="typography typography__body--link"
                    href="https://elifesciences.org/terms"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Terms and conditions
                </a>{' '}
                and{' '}
                <a
                    className="typography typography__body--link"
                    href="https://elifesciences.org/privacy"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Privacy policy
                </a>
                .
            </Paragraph>
        </div>
    );
};

export default Login;
