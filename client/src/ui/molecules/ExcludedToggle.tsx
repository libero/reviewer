import React, { ReactNode, Fragment, useState } from 'react';
import Close from '@material-ui/icons/Close';
interface Props {
    children?: ReactNode;
    panelHeading?: string;
    togglePrefixText: string;
    toggleActionText: string;
    open?: boolean;
}

const ExcludedToggle = ({ open = false, togglePrefixText, toggleActionText, children, panelHeading }: Props): JSX.Element => {
    const [opened, setOpened] = useState(open);
    return (
        <Fragment>
            {opened ? (
                <div className="excluded-toggle__panel">
                  <div className="excluded-toggle__panel-header">
                    <h3 className="excluded-toggle__panel-heading">{panelHeading}</h3>
                    <button className="excluded-toggle__close-button" onClick={(): void => setOpened(!opened)}><Close />close</button>
                  </div>
                  {children}
                </div>
            ) : (
                <span className="excluded-toggle__label">
                    {togglePrefixText}
                    <button className="excluded-toggle__action" aria-expanded={opened} onClick={(): void => setOpened(!opened)}>
                        {toggleActionText}
                    </button>
                    ?
                </span>
            )}
        </Fragment>
    );
};

export default ExcludedToggle;
