import React from 'react';

interface Props {
    children?: JSX.Element[];
}

const TwoColumnLayout = ({ children }: Props): JSX.Element => (
    <div className="two-column-layout">
        {React.Children.map(
            children,
            (item, index): JSX.Element => (
                <div className="two-column-layout__item" key={item.key || index}>
                    {item}
                </div>
            ),
        )}
    </div>
);

export default TwoColumnLayout;
