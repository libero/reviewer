import React, { useState, Fragment, ReactNode } from 'react';
import { Checkbox } from '../atoms';

interface Props {
  id: string;
  children?: ReactNode;
  toggleLabel: string;
}

const Toggle = ({ children, toggleLabel, id }: Props) => {
  const [toggled, setToggled] = useState(true);

  return (
    <Fragment>
      <Checkbox id={`${id}.toggle`} invalid={false} labelText={toggleLabel} onChange={(event): void => setToggled(event.target.checked)} initialValue={toggled}/>
      {
        toggled && <div className="toggle-field__panel">{children}</div>
      }
    </Fragment>
  )
}

export default Toggle;