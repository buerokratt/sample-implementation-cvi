import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';

const Layout: FC = () => {

  return (
    <div className='layout'>
      <div id='placeholder_for_main_navigation'>Main navigation</div>
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
