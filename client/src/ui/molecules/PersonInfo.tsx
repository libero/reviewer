import React from 'react';

interface Props {
    name: string;
    institution: string;
    expertises: string[];
    focuses: string[];
}

const PersonInfo = ({ name, institution, expertises, focuses }: Props): JSX.Element => {
    return (
        <div className="person-info">
            <span className="typography__heading typography__heading--h2">{name}</span>
            <span className="typography__body typography__body--primary">{institution}</span>
            <span className="typography__small typography__small--primary">{expertises.join(', ')}</span>
            <span className="typography__small typography__small--secondary typography__small--no-margin">
                {focuses.join(', ')}
            </span>
        </div>
    );
};

export default PersonInfo;
