import React, { TextareaHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string;
  id: string;
  invalid?: boolean;
  labelText: string;
}

const MultilineTextField = ({ id, labelText, helperText, invalid, ...rest }: Props): JSX.Element => (
  <div className="multiline-text-field">
        <label htmlFor={id} className="typography__label typography__label--primary">
            {labelText}
        </label>
        <textarea id={id} name={id} className={`multiline-text-field__input ${invalid ? 'multiline-text-field__input--invalid' : ''}`} {...rest} />
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

export default MultilineTextField;