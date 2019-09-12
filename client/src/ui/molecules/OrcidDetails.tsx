import React, { useState } from 'react';
import { TextField, TwoColumnLayout } from '../atoms';

export interface AuthorDetails {
    authorFirstName: string;
    authorLastName: string;
    authorEmail: string;
    institution: string;
}

interface Props {
    getOrcidDetails(): AuthorDetails;
}

const OrcidDetails = ({ getOrcidDetails }: Props, authorDetails: AuthorDetails): JSX.Element => {
    const [authorFirstName, setAuthorFirstName] = useState(authorDetails.authorFirstName || '');
    const [authorLastName, setAuthorLastName] = useState(authorDetails.authorLastName || '');
    const [authorEmail, setAuthorEmail] = useState(authorDetails.authorEmail || '');
    const [institution, setInstitution] = useState(authorDetails.institution || '');

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
            <div className="orcid-details__link_text">
                <span onClick={getDetails} className="typography__body typography__body--link">
                    Pre-fill my details{' '}
                </span>
                <span className="typography__body typography__body--primary">using ORCID</span>
            </div>
            <TwoColumnLayout>
                <TextField
                    id="authorFirstName"
                    invalid={false}
                    labelText="First name"
                    value={authorFirstName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorFirstName(event.currentTarget.value)
                    }
                />
                <TextField
                    id="authorLastName"
                    invalid={false}
                    labelText="Last name"
                    value={authorLastName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorLastName(event.currentTarget.value)
                    }
                />
                <TextField
                    id="authorEmail"
                    invalid={false}
                    labelText="Email (correspondence)"
                    value={authorEmail}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorEmail(event.currentTarget.value)
                    }
                />
                <TextField
                    id="institution"
                    invalid={false}
                    labelText="Institution"
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
