import React, { InputHTMLAttributes, useState, ChangeEvent } from 'react';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    initialValue?: boolean;
    labelText: string;
}

const Checkbox = ({ id, labelText, invalid, helperText, initialValue, onChange = (): void => {}, ...rest }: Props): JSX.Element => {
    const [checked, setChecked] = useState(initialValue);
    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>): void => {
        setChecked(event.target.checked);
        onChange(event); 
    };
    return (
        <div className="checkbox-field">
            <input id={id} className="checkbox-field__input" type="checkbox" onChange={onChangeCallback} defaultChecked={initialValue} {...rest} />
            <label
                htmlFor={id}
                className={`checkbox-field__label${checked ? ' checkbox-field__label--checked' : ''}${
                    invalid ? ' checkbox-field__label--invalid' : ''
                } typography__label typography__label--primary`}
            >
                {
                    checked && <Check aria-hidden="true" className="checkbox-field__label-check"/>
                }
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
    )
};

export default Checkbox;
