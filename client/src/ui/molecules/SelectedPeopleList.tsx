import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { Pod } from '../atoms';
import { PersonPod, PersonProps } from '.';
import { useTranslation } from 'react-i18next';

interface Props {
    people?: PersonProps[];
    openSelectorText: string;
    required?: boolean;
    onRemove: (personId: string) => void;
    onOpen: () => void;
}
const SelectedPeopleList = ({ people = [], openSelectorText, required, onRemove, onOpen }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className="selected_people_list">
            {people.map(
                (person: PersonProps): JSX.Element => (
                    <div key={person.id} className="selected_people_list__item">
                        <PersonPod
                            {...person}
                            toggleHandler={onRemove}
                            selectedButtonIcon={<Delete />}
                            initialySelected
                        />
                    </div>
                ),
            )}
            <div className="selected_people_list__item">
                <Pod onClick={onOpen} buttonIcon={<Add />} buttonText={t('ui:selected_people_list--open')}>
                    <div className="selected_people_list__pod-content">
                        {openSelectorText} ({required ? t('ui:validation--required') : t('ui:validation--optional')})
                    </div>
                </Pod>
            </div>
        </div>
    );
};

export default SelectedPeopleList;
