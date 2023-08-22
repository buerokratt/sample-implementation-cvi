import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { useQuery } from '@tanstack/react-query';
import { Header } from "../../exportcomponents/src/index";
import MainNavigation from "../MainMenu/main-navigation";
import useUserInfoStore from "../../exportcomponents/src/header/store/store";

const Layout: FC = () => {
    return (
    <div className='layout'>
      <div id='placeholder_for_main_navigation'><MainNavigation items={[]}/></div>
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'> <Header user={useUserInfoStore.getState()}/></div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
