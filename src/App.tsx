import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout.tsx';
import WelcomePage from './pages/info/welcome';
import useStore from "./exportcomponents/src/header/store/store";
import {useQuery} from "@tanstack/react-query";
import {UserInfo} from "./exportcomponents/src/header/types/userInfo";
import MainNavigationPage from "./pages/component/main-navigation";

const App: FC = () => {
    useQuery<{
        data: { custom_jwt_userinfo: UserInfo };
    }>({
        queryKey: ['mock-response'],
        onSuccess: (data: { data: { custom_jwt_userinfo: UserInfo } }) => {
            return useStore.getState().setUserInfo(data.data.custom_jwt_userinfo);
        },
    });

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/info/welcome" />} />
          <Route path="/info/*" element={<WelcomePage />} />
          <Route path="/training/*" element={<WelcomePage />} />
          <Route path="/chat/*" element={<WelcomePage />} />
          <Route path="/unanswered/*" element={<WelcomePage />} />
          <Route path="/active/*" element={<WelcomePage />} />
          <Route path="/analytics/*" element={<WelcomePage />} />
          <Route path="/component/mainnavigation" element={<MainNavigationPage />} />
          <Route path="/*" element={<MainNavigationPage />} />
        </Route>
      </Routes>
  );
};

export default App;

