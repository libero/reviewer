import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import AccountBox from '@material-ui/icons/AccountBox';

import useOnClickOutside from '../hooks/useOnClickOutside';

interface Props {
  name: string
}

const ProfileDropdown: React.FC<Props> = ({ name }: Props): JSX.Element => {
  const [expanded, setExpanded]: [boolean, Function] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>();
  useOnClickOutside(dropdownRef,() => setExpanded(false));

  return (
    <div ref={dropdownRef} className="profile_dropdown">
      <button 
        aria-haspopup="true" 
        aria-expanded={expanded} 
        onClick={(): void => setExpanded(!expanded)}
        className="profile_dropdown__button"
        >
        <AccountBox height="24" width="24" viewBox="3 3 18 18" />
        <span className="profile_dropdown__arrow" />
      </button>
      {
        expanded && 
        <div className="profile_dropdown__panel">
          <div className="profile_dropdown__item profile_dropdown__panel_heading">
            { name }
          </div>
          <ul className="profile_dropdown__list">
            <li className="profile_dropdown__list_item">
              <a href="https://orcid.org/my-orcid" className="profile_dropdown__item profile_dropdown__link">
                Manage ORCID
              </a>
            </li>
            <li className="profile_dropdown__list_item">
              <NavLink to="/logout" className="profile_dropdown__item profile_dropdown__link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      }
    </div>
  );
}

export default ProfileDropdown;