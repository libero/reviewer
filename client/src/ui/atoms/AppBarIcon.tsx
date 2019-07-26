import React from 'react';

interface AppBarIconProps {
    link: string;
    imgSrc: string;
    altText: string;
}

const AppBarIcon: React.FC<AppBarIconProps> = ({
    link = '',
    imgSrc = '',
    altText = '',
}: AppBarIconProps): JSX.Element => (
    <a href={link} className="app-bar__icon-link">
        <img className="app-bar__img" src={imgSrc} alt={altText} />
    </a>
);

export default AppBarIcon;
