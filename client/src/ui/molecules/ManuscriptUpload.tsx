import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface Props {
    inactiveContent?: string | JSX.Element | JSX.Element[];
    activeContent?: string | JSX.Element | JSX.Element[];
}

const ManuscriptUpload: React.FC<Props> = ({ inactiveContent, activeContent }: Props): JSX.Element => {
    const { t } = useTranslation();
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    let content;

    if (isDragActive) {
        content = (
            <div className="manuscript-upload__content manuscript-upload__content--active">
                {activeContent ? activeContent : <p>{t('ui:manuscript-upload.active-content')}</p>}
            </div>
        );
    } else {
        content = (
            <div className="manuscript-upload__content manuscript-upload__content--inactive">
                {inactiveContent ? inactiveContent : <p> {t('ui:manuscript-upload.inactive-content')}</p>}
            </div>
        );
    }

    return (
        <div className="manuscript-upload">
            <div className="manuscript-upload__dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {content}
            </div>
        </div>
    );
};

export default ManuscriptUpload;
