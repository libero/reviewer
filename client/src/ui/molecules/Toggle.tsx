import React, { useState, Fragment, ReactNode } from 'react';
import { Checkbox } from '../atoms';

interface Props {
    id: string;
    children?: ReactNode;
    toggleLabel: string;
    open?: boolean;
}

const Toggle = ({ children, toggleLabel, id, open = false }: Props): JSX.Element => {
    const [opened, setOpened] = useState(open);

    return (
        <Fragment>
            <Checkbox
                id={`${id}.toggle`}
                labelText={toggleLabel}
                onChange={(event): void => setOpened(event.target.checked)}
                initialValue={opened}
            />
            {opened && <div className="toggle-field__panel">{children}</div>}
        </Fragment>
    );
};

export default Toggle;
