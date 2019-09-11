import React, { InputHTMLAttributes } from 'react';
import Check from '@material-ui/icons/Check';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  id: string;
  invalid: boolean;
  labelText: string;
}

const Checkbox = ({ id, labelText, helperText, checked, ...rest }: Props) : JSX.Element => (
  <div className="checkbox-field">
    <input id={id} className="checkbox-field__input" type="checkbox" {...rest} checked={checked}/>
    <label htmlFor={id} className={`checkbox-field__label ${checked ? 'checkbox-field__label--checked' : ''} typography__label typography__label--primary`}>
      { labelText }
    </label>
  </div>
);

export default Checkbox;
