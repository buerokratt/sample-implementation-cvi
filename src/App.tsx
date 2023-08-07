import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout.tsx';
import WelcomePage from './pages/info/welcome';
import MainNavigationPage from './pages/component/main-navigation';


const App: FC = () => {

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/info/welcome" />} />
          <Route path="/info/welcome" element={<WelcomePage />} />
          <Route path="/component/mainnavigation" element={<MainNavigationPage />} />
        </Route>
      </Routes>
  );
};

export default App;

