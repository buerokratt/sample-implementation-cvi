import React from 'react';
import {
  MdOutlineForum, 
  MdOutlineAdb, 
  MdOutlineEqualizer, 
  MdMiscellaneousServices, 
  MdSettings, 
  MdOutlineMonitorWeight,
} from 'react-icons/md';

export const menuData = [
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
