import React, { FC, MouseEvent, useState, useMemo } from 'react';
import clsx from 'clsx';
import {
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
} from 'react-icons/md';
import Icon from './components/icons/icon/icon';
import { useTranslation } from "react-i18next";
import MenuTree from './components/menuTree';
import useFilteredMenuItems from './hooks/useFilteredMenuItems';
import './main-navigation.scss';

const MainNavigation: FC = () => {
  const { t } = useTranslation();
  const menuItems = useFilteredMenuItems();
  const serviceId = useMemo(() => import.meta.env.REACT_APP_SERVICE_ID.split(','), []);

  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    setNavCollapsed(false);
    const isExpanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  };

  if (!menuItems) return null;

  return (
    <nav className={clsx('nav', { 'collapsed': navCollapsed })}>
      <button className='nav__menu-toggle close-button-item' onClick={() => setNavCollapsed(!navCollapsed)}>
        {
          navCollapsed
          ? <Icon icon={<MdKeyboardArrowRight className='menu-item-icon' />} size='large' />
          : <Icon icon={<MdKeyboardArrowLeft className='menu-item-icon' />} size='large' />
        }
        <span className='menu-item-title'>{t('mainMenu.closeMenu')}</span>
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
