import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './index';

interface Props {
    isShowing: boolean;
    hide: Function;
    children?: JSX.Element[] | JSX.Element;
    onAccept?: Function;
}

const Modal = ({ isShowing, hide, children, onAccept }: Props): JSX.Element => {
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
                          <div className="modal">
                              {children}
                              <div className="modal__buttons">
                                  <Button onClick={(): void => hide()}>Cancel</Button>
                                  <Button onClick={(): void => accept()} type="danger">
                                      Accept
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
