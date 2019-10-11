import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button, Modal } from '../../atoms';
import '../../../core/styles/index.scss';
import useModal from '../../hooks/useModal';

const ModalWithButton = (): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const modalMessage = text('Modal Message', 'This is a modal');
    const fullscreen = boolean('Fullscreen', false);
    const buttonType = select('Button Type', ['primary', 'danger'], 'primary');
    const buttonText = text('Button Text', 'Accept');
    return (
        <Fragment>
            <Button onClick={(): void => toggle()}>Show Modal</Button>
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={action('accept')}
                onCancel={action('cancel')}
                fullscreen={fullscreen}
                buttonType={buttonType}
                buttonText={buttonText}
            >
                <p>{modalMessage}</p>
            </Modal>
        </Fragment>
    );
};

storiesOf('ui | atoms/Modal', module)
    .addDecorator(withKnobs)
    .add(
        'Modal',
        (): JSX.Element => {
            const isShowing = boolean('isShowing', false);
            const fullscreen = boolean('Fullscreen', false);
            const modalMessage = text('Modal Message', 'This is a modal');
            const buttonType = select('Button Type', ['primary', 'danger'], 'primary');
            const buttonText = text('Button Text', 'Accept');
            return (
                <Modal
                    hide={action('hide')}
                    isShowing={isShowing}
                    onAccept={action('accept')}
                    onCancel={action('cancel')}
                    buttonType={buttonType}
                    fullscreen={fullscreen}
                    buttonText={buttonText}
                >
                    <p>{modalMessage}</p>
                </Modal>
            );
        },
    )
    .add('Modal with Button', (): JSX.Element => <ModalWithButton />);
