import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { useQuery } from '@tanstack/react-query';
import { Header } from "../../headerV2";
import useUserInfoStore from "../../exportcomponents/src/header/store/store";
import { MainNavigation }  from "../../menuV2";
import {useToast} from "../../headerV2/src/header/hooks/useToast.tsx";

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
          <MainNavigation serviceId={import.meta.env.REACT_APP_SERVICE_ID.split(',')} items={MainMenuItems} />
          {/*<MainNavigation items={items}/>*/}
      </div>
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'>
            <Header
                toastContext={useToast()}
                user={useUserInfoStore.getState().userInfo}
            />
        </div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
