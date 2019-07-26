import React from 'react';

interface Props {
    link: string;
    imgSrc: string;
    altText: string;
}

const AppBarIcon: React.FC<Props> = ({ link = '', imgSrc = '', altText = '' }: Props): JSX.Element => (
    <a href={link} className="app-bar__icon-link">
        <img className="app-bar__img" src={imgSrc} alt={altText} />
    </a>
);

export default AppBarIcon;
