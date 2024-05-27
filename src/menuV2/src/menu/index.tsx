import React, { FC, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
    MdOutlineForum, 
    MdOutlineAdb, 
    MdOutlineEqualizer, 
    MdKeyboardArrowDown, 
    MdMiscellaneousServices, 
    MdSettings, 
    MdOutlineMonitorWeight,
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
} from 'react-icons/md';
import Icon from './components/icons/icon/icon';
import './main-navigation.scss';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
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
      icon: <MdOutlineForum className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_CONVERSATIONS_BASE_URL,
    },
    {
      id: 'training',
      icon: <MdOutlineAdb className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_TRAINING_BASE_URL,
    },
    {
      id: 'analytics',
      icon: <MdOutlineEqualizer className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_ANALYTICS_BASE_URL,
    },
    {
      id: "services",
      icon: <MdMiscellaneousServices className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_SERVICES_BASE_URL,
    },
    {
      id: 'settings',
      icon: <MdSettings className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_SETTINGS_BASE_URL,
    },
    {
      id: 'monitoring',
      icon: <MdOutlineMonitorWeight className='menu-item-icon' />,
      url: import.meta.env.REACT_APP_MONITORING_BASE_URL,
    },
  ];

  useQuery({
    queryKey: ['accounts/user-role', 'prod'],
    onSuccess: (res: any) => {
      const filteredItems =
          items.filter((item) => {
            const role = res.response;
            if (role.includes('ROLE_ADMINISTRATOR')) {
              return item.id;
            } else if (role.includes('ROLE_SERVICE_MANAGER')) {
              return item.id != "settings" && item.id != "training";
            } else if (role.includes('ROLE_CUSTOMER_SUPPORT_AGENT')) {
              return item.id != "settings" && item.id != "analytics";
            } else if (role.includes('ROLE_CHATBOT_TRAINER')) {
              return item.id != "settings" && item.id != "conversations";
            }  else if (role.includes('ROLE_ANALYST')) {
              return item.id == "analytics" || item.id == "monitoring";
            } else {
              return;
            }
          }) ?? [];
      setMenuItems(filteredItems);
    },
  });

  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    setNavCollapsed(false);
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
                  {menuItem.id && (
                    <Icon icon={menuData.find(dataItem => dataItem.id === menuItem.id)?.icon} size='large' />
                  )}
                  <span className='menu-item-title'>{menuItem.label[currentlySelectedLanguage]}</span>
                  <Icon icon={<MdKeyboardArrowDown />} className='menu-item-arrow' />
                </button>
                <ul className='nav__submenu'>
                  {renderMenuTree(menuItem.children.map((item)  => ({id: menuItem.id, ...item})))}
                </ul>
              </>
          ) : (
            serviceId.includes(menuItem.id)
              ? <NavLink to={menuItem.path || '#'}>
                  {menuItem.label[currentlySelectedLanguage]}
                </NavLink>
              : <a href={menuData.find(dataItem => dataItem.id === menuItem.id)?.url + menuItem.path}>
                  {menuItem.label[currentlySelectedLanguage]}
                </a>
          )}
        </li>
      ),
    );
  };

  const base = window.location.pathname.split("/")[1];
  const currentService = base === 'chat' ? serviceId : [base];
  const isSameRoot = (menuItem) => {
    if(currentService.includes(menuItem.id)) {
      return menuItem.children.some((item: MenuItem) => item.path?.includes("/" + window.location.pathname.split("/")[2]));
    }
    return false;
  }

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
        {renderMenuTree(menuItems)}
      </ul>
    </nav>
  );
};

export default MainNavigation;
