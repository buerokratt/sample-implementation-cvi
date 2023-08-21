import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
} from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './styles/main.scss';
import '../i18n';
import apis, {ax} from './components/AdminHeader/services/apis';
import * as API_CONF from './components/AdminHeader/services/api-conf';
import * as mocks from "./mocks/mockHandlers";

// **** Query client ****
// Query client part is not directly raleted to layout so it is optional
// But many components need to get some data from API sources, so every solution probably needs this

// const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
//   return queryKey;
// };

mocks;

const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
  if (queryKey.includes('prod')) {
    // ax is mocked api call used for mocking, should be replaced by correct call like in next api call
    console.log(queryKey[0] as string)
    const { data } = await ax.get(queryKey[0] as string);
    return data;
  }
  if (queryKey[1] === 'prod-2') {
    console.log('prod 2 is triggered')
    const { data } = await apis(API_CONF.DEV_V2_BASE_URL).get(queryKey[0] as string);
    return data?.response;
  }
  console.log('default is triggered')
  const { data } = await apis(API_CONF.DEV_BASE_URL).get(queryKey[0] as string);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

// ***** Query Client end ****

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
