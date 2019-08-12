import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button, Modal } from '../../atoms';
import '../../../core/styles/index.scss';
import useModal from '../../hooks/useModal';

const ModalWithButton = (): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const modalMessage = text('Modal Message', 'This is a modal');
    return (
        <Fragment>
            <Button onClick={(): void => toggle()}>Show Modal</Button>
            <Modal hide={toggle} isShowing={isShowing} onAccept={action('accept')}>
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
            const modalMessage = text('Modal Message', 'This is a modal');
            return (
                <Modal hide={action('hide')} isShowing={isShowing} onAccept={action('accept')}>
                    <p>{modalMessage}</p>
                </Modal>
            );
        },
    )
    .add('Modal with Button', (): JSX.Element => <ModalWithButton />);
