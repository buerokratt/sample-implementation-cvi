import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import AdminHeader from "../AdminHeader";

const Layout: FC = () => {

  return (
    <div className='layout'>
      <div id='placeholder_for_main_navigation'></div>
      <div className='layout__wrapper'>
        <div id='placeholder_for_header'> <AdminHeader/></div>
        <main className='layout__main'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
