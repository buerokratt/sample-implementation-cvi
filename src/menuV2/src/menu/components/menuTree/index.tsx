import React, { FC, MouseEvent } from "react";
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MenuItem } from "../../types/menuItem";
import { useTranslation } from "react-i18next";
import { menuData } from './menuData';
import Icon from "../icons/icon/icon";
import { isSameRoot } from "./isSameRoot";
import clsx from 'clsx';
import '../../main-navigation.scss';

interface MenuTreeProps {
  menuItems: MenuItem[];
  serviceId: string[];
  handleNavToggle: (event: MouseEvent) => void;
}

interface MenuItemLabelProps {
  menuItem: MenuItem
  currentlySelectedLanguage: string
}

const MenuItemLabel: React.FC<MenuItemLabelProps> = ({ menuItem, currentlySelectedLanguage }) => {
  return (
    <>
      {menuItem.label[currentlySelectedLanguage]} {menuItem.count != null ? `(${menuItem.count})` : ''}
    </>
  );
};

const MenuTree: FC<MenuTreeProps> = ({
  menuItems,
  serviceId,
  handleNavToggle,
}) => {
  const currentlySelectedLanguage = useTranslation().i18n.language;

  return menuItems
    .filter(x => !x.hidden)
    .map((menuItem) => (
      <li key={menuItem.label[currentlySelectedLanguage]}>
        {!!menuItem.children ? (
            <>
              <button
                className={clsx('nav__toggle', { 'nav__toggle--icon': !!menuItem.id })}
                aria-expanded={menuItem.path && (isSameRoot(menuItem, serviceId)) ? 'true' : 'false'}
                onClick={handleNavToggle}
              >
                {menuItem.id && (
                  <Icon icon={menuData.find(dataItem => dataItem.id === menuItem.id)?.icon} size='large' />
                )}
                <span className='menu-item-title'>{menuItem.label[currentlySelectedLanguage]}</span>
                <Icon icon={<MdKeyboardArrowDown />} className='menu-item-arrow' />
              </button>
              <ul className='nav__submenu'>
                <MenuTree
                  menuItems={menuItem.children.map((item)  => ({id: menuItem.id, ...item}))}
                  serviceId={serviceId}
                  handleNavToggle={handleNavToggle}
                />
              </ul>
            </>
        ) : (
          serviceId.includes(menuItem.id!)
            ? <NavLink to={menuItem.path || '#'}>
                <MenuItemLabel menuItem={menuItem} currentlySelectedLanguage={currentlySelectedLanguage} />
              </NavLink>
            : <a href={(menuData.find(dataItem => dataItem.id === menuItem.id)?.url ?? '') + menuItem.path}>
                <MenuItemLabel menuItem={menuItem} currentlySelectedLanguage={currentlySelectedLanguage} />
              </a>
        )}
      </li>
    ),
  );
}

export default MenuTree;
