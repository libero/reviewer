import React from 'react';
import { PersonPod, Person } from '.';

interface Props {
  people?: Person[]
}
const SelectedPeopleList = (): JSX.Element => {
  return (<div className="selected_people_list">

  </div>);
};

export default SelectedPeopleList;