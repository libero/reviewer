import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { ManuscriptUpload } from '../../molecules';
import { default as UploadIcon } from '../../atoms/UploadIcon';

storiesOf('ui | molecules/ManuscriptUpload', module)
    .addDecorator(withKnobs)
    .add(
        'ManuscriptUpload',
        (): JSX.Element => {
            return <ManuscriptUpload />;
        },
    )
    .add(
        'With Custom Content',
        (): JSX.Element => {
            const activeContent = text(
                'Active Content',
                'Once thy manuscript hath been dragged upon the dropzone, being the manuscript being dragged, thou shall drop it promptly herein.',
            );
            const inactiveContent = text('InactiveContent', `Upload thy manuscript here`);
            const uploadProgress = boolean('Upload Progress', false);

            const finalInactiveContent = uploadProgress ? (
                <div>
                    <UploadIcon />
                    <p>{inactiveContent}</p>
                </div>
            ) : (
                inactiveContent
            );

            return <ManuscriptUpload activeContent={activeContent} inactiveContent={finalInactiveContent} />;
        },
    );
