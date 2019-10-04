import React from 'react';
import Close from '@material-ui/icons/Close';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Select, { components } from 'react-select';
import { IndicatorProps } from 'react-select/src/components/indicators';

interface Value {
    label: string;
    value: string;
}

interface Props {
    helperText?: string;
    id: string;
    invalid: boolean;
    labelText: string;
    values: Value[];
    multi?: boolean;
    searchable?: boolean;
    placeholder?: string;
    onChange?(): void;
}
const DropdownIndicator = (props: IndicatorProps<Value>): JSX.Element => (
    <components.DropdownIndicator {...props}>
        <ArrowDropDown />
    </components.DropdownIndicator>
);
const SelectField = ({
    helperText,
    id,
    invalid,
    labelText,
    values,
    multi = false,
    placeholder,
    onChange,
}: Props): JSX.Element => {
    return (
        <React.Fragment>
            <span id={`${id}-label`} className="typography__label typography__label--primary">
                {labelText}
            </span>
            <Select
                aria-labelledby={`${id}-label`}
                className={`select-field ${invalid ? 'select-field--error' : ''}`}
                classNamePrefix="select-field"
                options={values}
                components={{ DropdownIndicator }}
                placeholder={placeholder}
                onChange={onChange}
                isMulti={multi}
            />
            <span
                className={`typography__label typography__label--helper-text ${
                    invalid ? 'typography__label--error' : 'typography__label--secondary'
                }`}
            >
                {invalid && <Close fontSize="small" />}
                {helperText}
            </span>
        </React.Fragment>
    );
};

export default SelectField;
