import React, { InputHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    helperText?: string;
    id: string;
    invalid: boolean;
    labelText: string;
}

const Checkbox = ({ id, labelText, invalid, helperText, checked, ...rest }: Props): JSX.Element => (
    <div className="checkbox-field">
        <input id={id} className="checkbox-field__input" type="checkbox" {...rest} checked={checked} />
        <label
            htmlFor={id}
            className={`checkbox-field__label${checked ? ' checkbox-field__label--checked' : ''}${
                invalid ? ' checkbox-field__label--invalid' : ''
            } typography__label typography__label--primary`}
        >
            {labelText}
        </label>
        <span
            className={`typography__label typography__label--helper-text ${
                invalid ? 'typography__label--error' : 'typography__label--secondary'
            }`}
        >
            {invalid && <Close fontSize="default" />}
            {helperText}
        </span>
    </div>
);

export default Checkbox;
