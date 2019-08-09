import React, { useState, useRef } from 'react';
import Menu, { MenuItemType } from './Menu';
import { default as MenuIcon } from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import useOnClickOutside from '../hooks/useOnClickOutside';

interface BurgerMenuProps {
    items?: MenuItemType[];
}

type BurgerMenuContentProps = BurgerMenuProps & {
    expanded: boolean;
    setExpanded: (a: boolean) => void;
};

const BurgerMenuContent: React.FC<BurgerMenuContentProps> = ({
    expanded,
    setExpanded,
    items,
}: BurgerMenuContentProps): JSX.Element => {
    const panelRef = useRef<HTMLDivElement>();
    useOnClickOutside(panelRef, (): void => setExpanded(false));
    return (
        <div aria-expanded="true" className="burger_menu__overlay">
            <div ref={panelRef} className="burger_menu__panel">
                <button
                    className="burger_menu__icon_button burger_menu__icon_button--collapse"
                    onClick={(): void => setExpanded(!expanded)}
                >
                    <Close />
                </button>
                <Menu items={items} rootClassName="burger_menu" onLinkClick={(): void => setExpanded(false)} />
            </div>
        </div>
    );
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ items }: BurgerMenuProps): JSX.Element => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="burger_menu">
            <button
                aria-haspopup="true"
                onClick={(): void => setExpanded(!expanded)}
                className="burger_menu__icon_button burger_menu__icon_button--expand"
            >
                <MenuIcon />
            </button>
            {expanded && <BurgerMenuContent expanded={expanded} setExpanded={setExpanded} items={items} />}
        </div>
    );
};

export default BurgerMenu;
