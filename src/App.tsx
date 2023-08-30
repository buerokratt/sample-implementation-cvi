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
    // const { data: userInfo } = useQuery<{
    //     data: { custom_jwt_userinfo: UserInfo };
    // }>({
    //     queryKey: ['cs-custom-jwt-userinfo'],
    //     onSuccess: (data: { data: { custom_jwt_userinfo: UserInfo } }) =>
    //         store.setUserInfo(data.data.custom_jwt_userinfo),
    // });
    // const { data: userInfo } = useQuery<UserInfo>({
    //     queryKey: ['mock-response', 'auth'],
    //     onSuccess: (data) => store.setUserInfo(data),
    // });

    const { data: userInfo } = useQuery<UserInfo>({
        queryKey: ['steps/tim/mock-response', 'auth'],
        onSuccess: (data) => {
            console.log(data.response.body.displayName)
            store.setUserInfo(data.response.body)
        },
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

