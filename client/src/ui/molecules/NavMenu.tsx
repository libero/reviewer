import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavMenuItemType {
    url: string;
    display: string;
    external?: boolean;
}

export interface Props {
    items?: NavMenuItemType[];
    vertical?: boolean;
}

const NavMenu: React.FC<Props> = ({ items = [], vertical }: Props): JSX.Element => (
    <ul className={`nav-menu nav-menu--${vertical ? 'vertical' : 'inline'}`}>
        {items.map(
            (item): JSX.Element => (
                <li className="nav-menu__item" key={`${item.url}-${item.display}`}>
                    {item.external ? (
                        <a className="nav-menu__link" href={item.url}>
                            {item.display}
                        </a>
                    ) : (
                        <NavLink
                            className="nav-menu__link"
                            activeClassName="nav-menu__link--active"
                            exact
                            to={item.url}
                        >
                            {item.display}
                        </NavLink>
                    )}
                </li>
            ),
        )}
    </ul>
);

export default NavMenu;
