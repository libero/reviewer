import React, { useState, useRef } from 'react';
import Menu, { MenuItemType } from './Menu';
import { default as MenuIcon } from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import useOnClickOutside from '../hooks/useOnClickOutside';

interface Props {
  items?: MenuItemType[];
}
const BurgerMenu: React.FC<Props> = ({ items }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>();
  useOnClickOutside(panelRef,() => setExpanded(false));

  return (
    <div className="burger_menu" >
      <button 
        aria-haspopup="true"
        onClick={(): void => setExpanded(!expanded)}
        className="burger_menu__icon_button burger_menu__icon_button--expand">
        <MenuIcon />
      </button>
      {
        expanded &&
        <div aria-expanded="true"  className="burger_menu__overlay">
          <div ref={panelRef} className="burger_menu__panel">
            <button 
              className="burger_menu__icon_button burger_menu__icon_button--collapse" 
              onClick={(): void => setExpanded(!expanded)}>
              <Close />
            </button>
            <Menu items={items} rootClassName="burger_menu" onLinkClick={() => setExpanded(false)}/>
          </div>
        </div>
      }
    </div>
  )
}

export default BurgerMenu;