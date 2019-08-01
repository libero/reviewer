import React from 'react';
import { NavLink } from 'react-router-dom';

export interface MenuItemType {
    url: string;
    display: string;
    external?: boolean;
}

export interface Props {
    items?: MenuItemType[];
    rootClassName?: string;
    onLinkClick?: () => void;
}

const Menu: React.FC<Props> = ({
    items = [],
    rootClassName = 'menu',
    onLinkClick = (): void => {},
}: Props): JSX.Element => (
    <ul className={`${rootClassName}__list`}>
        {items.map(
            (item): JSX.Element => (
                <li className={`${rootClassName}__item`} key={`${item.url}-${item.display}`}>
                    {item.external ? (
                        <a className={`${rootClassName}__link`} href={item.url}>
                            {item.display}
                        </a>
                    ) : (
                        <NavLink
                            className={`${rootClassName}__link`}
                            activeClassName={`${rootClassName}__link--active`}
                            exact
                            onClick={onLinkClick}
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

export default Menu;
