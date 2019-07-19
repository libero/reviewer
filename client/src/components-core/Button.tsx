import React from 'react';
const Button = ({ text, float, onClick }: { text: string; float?: string; onClick?: any }) => {
    return (
        <button
            style={{
                // this should be moved into its own variable somewhere
                float: float || ('left' as any),
                color: 'rgb(255, 255, 255)',
                fontSize: '14px',
                lineHeight: '18px',
                textTransform: 'uppercase',
                fontFamily: '"Noto Sans", Arial, Helvetica, sans- serif',
                fontWeight: 700,
                minWidth: '120px',
                height: '48px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderImage: 'initial',
                borderRadius: '3px',
                background: 'rgb(2, 136, 209)',
                padding: '12px 18px 9px',
                borderColor: 'rgb(2, 136, 209)',
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
