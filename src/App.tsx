import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout.tsx';
import WelcomePage from './pages/info/welcome';
import useUserInfoStore from "./exportcomponents/src/header/store/store";
import {useQuery} from "@tanstack/react-query";
import {UserInfo} from "./exportcomponents/src/header/types/userInfo";


const App: FC = () => {
    // fetching initial person information
    const store = useUserInfoStore();
    const { data: userInfo } = useQuery<{
        data: { custom_jwt_userinfo: UserInfo };
    }>({
        queryKey: ['cs-custom-jwt-userinfo'],
        onSuccess: (data: { data: { custom_jwt_userinfo: UserInfo } }) =>
            store.setUserInfo(data.data.custom_jwt_userinfo),
    });

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/info/welcome" />} />
          <Route path="/info/welcome" element={<WelcomePage />} />
        </Route>
      </Routes>
  );
};

export default App;

