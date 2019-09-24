import React, { useState } from 'react';
import { TextField } from '../atoms';
import { Search, Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const SearchField = ({ id, onChange }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [empty, setEmpty] = useState(true);
    const change = (event: React.FormEvent<HTMLInputElement>): void => {
        if (onChange) {
            event.persist();
            onChange(event);
        }
        setSearch(event.currentTarget.value);
        setEmpty(event.currentTarget.value.length === 0);
    };

    const clearSearch = (): void => {
        setSearch('');
        setEmpty(true);
    };

    return (
        <TextField
            id={id}
            icon={empty ? <Search fontSize="small" /> : <Close fontSize="small" onClick={clearSearch} />}
            value={search}
            onChange={change}
            labelText={t('ui:search-box--label')}
            helperText={t('ui:search-box--helper')}
        />
    );
};

export default SearchField;
