import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { Pod } from '../atoms';
import { PersonPod, PersonProps } from '.';

interface Props {
    people?: PersonProps[];
}
const SelectedPeopleList = ({ people = [] }: Props): JSX.Element => {
    return (
        <div className="selected_people_list">
            {people.map((person: PersonProps) => (
                <div key={person.id} className="selected_people_list__item">
                  <PersonPod {...person} toggleHandler={():void => {}} selectedButtonIcon={<Delete />} initialySelected/>
                </div>
            ))}
            <div className="selected_people_list__item">
                <Pod onClick={()=>{}} buttonIcon={<Add />} buttonText="Add" >
                        <span>Choose editor (required)</span>
                </Pod>
            </div>
        </div>
    );
};

export default SelectedPeopleList;
