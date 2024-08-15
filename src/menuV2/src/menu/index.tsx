import React, { FC, MouseEvent, useState, useMemo } from 'react';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import Icon from './components/icons/icon/icon';
import { useTranslation } from "react-i18next";
import MenuTree from './components/menuTree';
import useFilteredMenuItems from './hooks/useFilteredMenuItems';
import './main-navigation.scss';
import { CountConf } from "./types/countConf";

interface MainNavigationProps {
  countConf?: CountConf
}

const MainNavigation: FC<MainNavigationProps> = ({countConf}) => {
  const { t } = useTranslation();
  const menuItems = useFilteredMenuItems(countConf);
  const serviceId = useMemo(() => import.meta.env.REACT_APP_SERVICE_ID.split(','), []);

  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    setNavCollapsed(false);
    const isExpanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  };

  const handleCloseButtonClick = () => {
    const doesMenuHasExpandedItem =  !!document.querySelector('button[aria-expanded="true"]');
    if(doesMenuHasExpandedItem)
      setNavCollapsed(!navCollapsed);
  }

  if (!menuItems) return null;

  return (
    <nav className={clsx('nav', { 'collapsed': navCollapsed })}>
      <button className='nav__menu-toggle close-button-item' onClick={handleCloseButtonClick}>
        <Icon icon={<MdClose />} />
        <span className='menu-item-title'>{t(navCollapsed ? 'mainMenu.openMenu' : 'mainMenu.closeMenu' )}</span>
      </button>
      <ul className='nav__menu'>
        <MenuTree
          menuItems={menuItems}
          serviceId={serviceId}
          handleNavToggle={handleNavToggle}
        />
      </ul>
    </nav>
  );
};

export default MainNavigation;
