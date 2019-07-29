import React, { useState } from 'react'

interface Props {

}

const ProfileDropdown: React.FC<Props> = (props: Props): JSX.Element => {
  const [expanded, setExpanded]: [boolean, Function] = useState(false);

  return (
    <div className="profile-dropdown">
      <button aria-haspopup="true" aria-expanded={expanded} onClick={(): void => setExpanded(!expanded)}>
        Profile
      </button>
      {
        expanded && <div>Menu</div>
      }
    </div>
  );
}

export default ProfileDropdown;