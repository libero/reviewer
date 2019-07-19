import React, { FormEvent, useState } from 'react';

const TextField = ({
    initialValue,
    placeholder,
    label,
    onChange,
    touchedNote,
}: {
    label: string;
    placeholder: string;
    initialValue?: string;
    touchedNote?: string;
    onChange: (event: FormEvent & { target: { value: string } }) => void;
}) => {
    const [touched, setTouched] = useState<boolean>(false);
    return (
        <div
            style={{
                padding: '24px 0px 24px 0px',
            }}
        >
            <span
                style={{
                    display: 'block',
                    fontSize: '14px',
                }}
            >
                {label}{' '}{touched && touchedNote ? <span style={{ color: 'rgb(136, 136, 136)' }}>{touchedNote}</span> : ''}
            </span>
            <input
                style={{
                    width: '100%',
                    borderRadius: '3px',
                    border: '1px solid rgb(224, 224, 224)',
                    fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    lineHeight: '24px',
                    padding: '12px',
                    height: '48px',
                }}
                name="title"
                type="Text"
                placeholder={placeholder}
                onChange={(ev): void => {
                    setTouched(true);
                    onChange(ev);
                }}
                // Use the updated value, otherwise set to the existing initial value
                value={touched ? undefined : initialValue}
            />
        </div>
    );
};

export default TextField;
