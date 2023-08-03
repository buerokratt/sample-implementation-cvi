import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from 'components/main-navigation/main-navigation.tsx'
import './layout.scss';

const Layout: FC = () => {
  /** Main navigation START */
  /** Impement logic to load/request main navifation items */
  const navmenu: any = [
    {
        "id": "info",
        "label": {
            "et": "Info",
            "en": "Info"
        },
        "path": "/info",
        "children": [
            {
                "label": {
                    "et": "Tervitus",
                    "en": "Welcome"
                },
                "path": "/info/welcome"
            }
        ]
    },
    {
      "id": "component",
      "label": {
          "et": "Komponendid",
          "en": "Components"
      },
      "path": "/component",
      "children": [
          {
              "label": {
                  "et": "Navigatsiooni menüü",
                  "en": "Main navigation"
              },
              "path": "/component/mainnavigation"
          }
      ]
    }
  ];


  /** Main navigation END */

  return (
    <div className='layout'>
      <MainNavigation items={navmenu} />
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'> Header</div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
