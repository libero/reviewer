import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    image: string;
    artistName: string;
    artistUrl: string;
}

const ImageWithAttribution = ({ image, artistName, artistUrl }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="image-attributed__image">
            <img className="image-attributed__image--image" alt="Login Page Art" src={image} />
            <p className="image-attributed__image--credit">
                {t('ui:image-attribution')}
                <a href={artistUrl}>{artistName}</a>
            </p>
        </div>
    );
};

export default ImageWithAttribution;
