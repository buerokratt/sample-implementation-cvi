import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import MainNavigation from 'components/main-navigation/main-navigation.tsx'
import items from '../main-navigation/menu.json'
// import items from '../../exportcomponents/src/menu/components/main-navigation/menu.json'
import './layout.scss';
import { useQuery } from '@tanstack/react-query';
// import { Header, MainNavigation } from '../../exportcomponents/src/index.ts';
// import { Header } from "@exirain/header/src";
import {
    Header,
    MainNavigation
} from '../../exportcomponents/src/index.ts';
import useUserInfoStore from "../../exportcomponents/src/header/store/store";

const Layout: FC = () => {
    const CACHE_NAME = 'mainmenu-cache';
    const [MainMenuItems, setMainMenuItems] = useState([])
    const  {data, isLoading, status}  = useQuery({
        queryKey: [import.meta.env.REACT_APP_MENU_URL + import.meta.env.REACT_APP_MENU_PATH],
        onSuccess: (res: any) => {
            try {
                setMainMenuItems(res);
                localStorage.setItem(CACHE_NAME, JSON.stringify(res));
            } catch (e) {
                console.log(e);
            }
        },
        onError: (error: any) => {
            setMainMenuItems(getCache());
        }

    });

    function getCache(): any {
        const cache = localStorage.getItem(CACHE_NAME) || '{}';
        return JSON.parse(cache);
    }

    return (
    <div className='layout'>
      <div id='placeholder_for_main_navigation'>
          <MainNavigation serviceId={import.meta.env.REACT_APP_SERVICE_ID.split(',')} items={MainMenuItems} basePath={"chat"}/>
          {/*<MainNavigation items={items}/>*/}
      </div>
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'>
            <Header
            user={useUserInfoStore.getState()}
            baseUrl={"http://localhost:4003"}
            baseUrlV2={"http://localhost:5003"}
            analticsUrl={"http://localhost:6003"}/>
        </div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
