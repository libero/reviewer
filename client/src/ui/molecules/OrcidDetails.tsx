import React, { useState } from 'react';
import { TextField, TwoColumnLayout } from '../atoms';
import { useTranslation } from 'react-i18next';

export interface AuthorDetails {
    authorFirstName: string;
    authorLastName: string;
    authorEmail: string;
    institution: string;
}

interface Props {
    getOrcidDetails?(): AuthorDetails;
}

const OrcidDetails = ({ getOrcidDetails }: Props, authorDetails: AuthorDetails): JSX.Element => {
    const [authorFirstName, setAuthorFirstName] = useState(authorDetails.authorFirstName || '');
    const [authorLastName, setAuthorLastName] = useState(authorDetails.authorLastName || '');
    const [authorEmail, setAuthorEmail] = useState(authorDetails.authorEmail || '');
    const [institution, setInstitution] = useState(authorDetails.institution || '');
    const { t } = useTranslation();

    const getDetails = (): void => {
        const {
            authorFirstName: newAuthorFirstName,
            authorLastName: newAuthorLastName,
            authorEmail: newAuthorEmail,
            institution: newInstitution,
        } = getOrcidDetails();
        setAuthorFirstName(newAuthorFirstName);
        setAuthorLastName(newAuthorLastName);
        setAuthorEmail(newAuthorEmail);
        setInstitution(newInstitution);
    };

    return (
        <div>
            {getOrcidDetails && (
                <div className="orcid-details__link_text">
                    <span onClick={getDetails} className="typography__body typography__body--link">
                        {t('orcid-details:prefill--link')}{' '}
                    </span>
                    <span className="typography__body typography__body--primary">
                        {t('orcid-details:prefill--text')}
                    </span>
                </div>
            )}
            <TwoColumnLayout>
                <TextField
                    id="authorFirstName"
                    invalid={false}
                    labelText={t('orcid-details:author-first-name')}
                    value={authorFirstName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorFirstName(event.currentTarget.value)
                    }
                />
                <TextField
                    id="authorLastName"
                    invalid={false}
                    labelText={t('orcid-details:author-last-name')}
                    value={authorLastName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorLastName(event.currentTarget.value)
                    }
                />
                <TextField
                    id="authorEmail"
                    invalid={false}
                    labelText={t('orcid-details:author-email')}
                    value={authorEmail}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorEmail(event.currentTarget.value)
                    }
                />
                <TextField
                    id="institution"
                    invalid={false}
                    labelText={t('orcid-details:label')}
                    value={institution}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setInstitution(event.currentTarget.value)
                    }
                />
            </TwoColumnLayout>
        </div>
    );
};

export default OrcidDetails;
