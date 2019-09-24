import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './index';
import { useTranslation } from 'react-i18next';

interface Props {
    isShowing: boolean;
    hide: Function;
    children?: JSX.Element[] | JSX.Element;
    onAccept?: Function;
    buttonText?: string;
    fullscreen?: boolean;
    buttonType?: string;
}

const Modal = ({
    isShowing,
    hide,
    children,
    onAccept,
    fullscreen = false,
    buttonType = 'danger',
    buttonText,
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const accept = (): void => {
        if (onAccept) {
            onAccept();
        }
        hide();
    };
    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal__overlay">
                      <div className="modal__wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                          <div className={`modal ${fullscreen ? 'modal__fullscreen' : ''}`}>
                              <div className={`modal__content ${fullscreen ? 'modal__content--fullscreen' : ''}`}>
                                  {children}
                              </div>
                              {fullscreen && <div className="modal__separator" />}
                              <div className={`modal__buttons ${fullscreen ? 'modal__buttons--fullscreen' : ''}`}>
                                  <Button onClick={(): void => hide()}>Cancel</Button>
                                  <Button onClick={(): void => accept()} type={buttonType}>
                                      {buttonText || t('ui:modal--default-button')}
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default Modal;
