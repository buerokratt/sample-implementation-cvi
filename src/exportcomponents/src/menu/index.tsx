import React, {FC, MouseEvent, useEffect, useState} from 'react';

import {NavLink, useLocation} from 'react-router-dom';
import {MdClose, MdKeyboardArrowDown, MdMiscellaneousServices} from 'react-icons/md';
import clsx from 'clsx';
import { MdOutlineForum, MdOutlineAdb, MdOutlineEqualizer, MdSettings, MdOutlineMonitorWeight } from 'react-icons/md';
import  Icon from './components/icons/icon/icon';
import './main-navigation.scss';
import { useQuery } from '@tanstack/react-query';
import {useTranslation} from "react-i18next";
import menuStructure from './data/menu-structure.json';

interface MenuItem {
    id?: string;
    label: TranslatedLabel;
    path?: string;
    target?: '_blank' | '_self';
    children?: MenuItem[];
}

interface TranslatedLabel {
    [lang: string] : string;
}

const MainNavigation: FC<{items: MenuItem[], serviceId: string[]}> = ( {items, serviceId}) => {
  if(!items.isArray || items.length === 0) {
    items = menuStructure;
  }

  const { t, i18n } = useTranslation();
  const currentlySelectedLanguage = i18n.language;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const menuData = [
    {
      id: 'conversations',
      icon: <MdOutlineForum />,
      url: import.meta.env.REACT_APP_CONVERSATIONS_BASE_URL,
    },
    {
      id: 'training',
      icon: <MdOutlineAdb />,
      url: import.meta.env.REACT_APP_TRAINING_BASE_URL,
    },
    {
      id: 'analytics',
      icon: <MdOutlineEqualizer />,
      url: import.meta.env.REACT_APP_ANALYTICS_BASE_URL,
    },
    {
      id: "services",
      icon: <MdMiscellaneousServices />,
      url: import.meta.env.REACT_APP_SERVICES_BASE_URL,
    },
    {
      id: 'settings',
      icon: <MdSettings />,
      url: import.meta.env.REACT_APP_SETTINGS_BASE_URL,
    },
    {
      id: 'monitoring',
      icon: <MdOutlineMonitorWeight />,
      url: import.meta.env.REACT_APP_MONITORING_BASE_URL,
    },
  ];

  let activeMenuId;

  const { data } = useQuery({
    queryKey: ['cs-get-user-role', 'prod'],
    onSuccess: (res: any) => {
      const filteredItems = items.filter((item) => {
        const role = res.data.get_user[0].authorities[0]
        switch (role) {
          case 'ROLE_ADMINISTRATOR': return item.id
          case 'ROLE_SERVICE_MANAGER': return item.id != 'settings' && item.id != 'training'
          case 'ROLE_CUSTOMER_SUPPORT_AGENT': return item.id != 'settings' && item.id != 'analytics'
          case 'ROLE_CHATBOT_TRAINER': return item.id != 'settings' && item.id != 'conversations'
          case 'ROLE_ANALYST': return item.id == 'analytics'
          case 'ROLE_UNAUTHENTICATED': return
          default: return
        }
      }) ?? []
      setMenuItems(filteredItems)
    }

  });

  const location = useLocation();
  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    const isExpanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  };

  const renderMenuTree = (menuItems: MenuItem[]) => {
    return menuItems.map((menuItem) => (
      <li key={menuItem.label[currentlySelectedLanguage]}>
        {!!menuItem.children ? (
          <>
            <button
              className={clsx('nav__toggle', { 'nav__toggle--icon': !!menuItem.id })}
              aria-expanded={menuItem.path && (isSameRoot(menuItem)) ? 'true' : 'false'}
              onClick={handleNavToggle}
            >
              { menuItem.id &&  (
                <Icon icon={menuData.find(dataItem => dataItem.id === menuItem.id)?.icon} />
              )}

              <span>{menuItem.label[currentlySelectedLanguage]}</span>
              <Icon icon={<MdKeyboardArrowDown />} />
            </button>
            <ul className='nav__submenu'>
              {renderMenuTree(menuItem.children.map((item)  => ({id: menuItem.id, ...item})))}
            </ul>
          </>
        ) : (

          (serviceId.includes(menuItem.id)) ?
            <NavLink to={menuItem.path || '#'}>{menuItem.label[currentlySelectedLanguage] }</NavLink> :
            <a href={menuData.find(dataItem => dataItem.id === menuItem.id)?.url + menuItem.path}>{menuItem.label[currentlySelectedLanguage]}</a>

        )}
      </li>),
    );
  };

  const base = window.location.pathname.split("/")[1];
  const currentService = base === 'chat' ? serviceId : [base];
  const isSameRoot = (menuItem) => {
    let result = false;
    if(currentService.includes(menuItem.id)){
      result = menuItem.children.some((item: MenuItem) => item.path?.includes("/" + window.location.pathname.split("/")[2]));
    }
    return result;
  }

  if (!menuItems) return null;

  return (
    <nav className={clsx('nav', { 'nav--collapsed': navCollapsed })}>
      <button className='nav__menu-toggle' onClick={() => setNavCollapsed(!navCollapsed)}>
        <Icon icon={<MdClose />} />
        {t('mainMenu.closeMenu')}
      </button>
      <ul className='nav__menu'>
        {renderMenuTree(menuItems)}
      </ul>
    </nav>
  );
};

export default MainNavigation;
