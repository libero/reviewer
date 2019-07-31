import React, { ReactNode, useState } from 'react';
import Menu from '@material-ui/icons/Menu';

interface Props {
  children?: ReactNode;
}
const BurgerMenu: React.FC<Props> = ({ children }:Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="burger-menu" >
      <button 
        aria-haspopup="true" 
        aria-expanded={expanded} 
        onClick={(): void => setExpanded(!expanded)}
        className="burger-menu__toggle-button">
        <Menu />
      </button>
      {
        expanded &&
        <div>
          { children }
        </div>
      }
    </div>
  )
}

export default BurgerMenu;