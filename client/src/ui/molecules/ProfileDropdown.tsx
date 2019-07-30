import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AccountBox from '@material-ui/icons/AccountBox';

interface Props {
  name: string
}

function useOnClickOutside(ref: React.MutableRefObject<HTMLElement>, callback: Function) {
  const clickHandler = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  },[])
}

const ProfileDropdown: React.FC<Props> = ({ name }: Props): JSX.Element => {
  const [expanded, setExpanded]: [boolean, Function] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>();
  useOnClickOutside(dropdownRef,() => setExpanded(false));

  return (
    <div ref={dropdownRef} className="profile-dropdown">
      <button 
        aria-haspopup="true" 
        aria-expanded={expanded} 
        onClick={(): void => setExpanded(!expanded)}
        className="profile-dropdown__button"
        >
        <AccountBox height="24" width="24" viewBox="3 3 18 18" />
        <span className="profile-dropdown__arrow" />
      </button>
      {
        expanded && 
        <div className="profile-dropdown__panel">
          <div className="profile-dropdown__item profile-dropdown__panel-heading">
            { name }
          </div>
          <ul className="profile-dropdown__list">
            <li className="profile-dropdown__list-item">
              <a href="https://orcid.org/my-orcid" className="profile-dropdown__item profile-dropdown__link">
                Manage ORCID
              </a>
            </li>
            <li className="profile-dropdown__list-item">
              <NavLink to="/logout" className="profile-dropdown__item profile-dropdown__link">
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