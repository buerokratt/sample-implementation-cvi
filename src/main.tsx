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
import { mockApi } from "./exportcomponents/src/header/services/mock-apis";
import * as API_CONF from './exportcomponents/src/header/services/api-conf';
import * as mocks from "./mocks/mockHandlers";
import auth from "./exportcomponents/src/header/services/auth";

// **** Query client ****
// Query client part is not directly raleted to layout so it is optional
// But many components need to get some data from API sources, so every solution probably needs this

// const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
//   return queryKey;
// };

mocks;

const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
  if (queryKey.includes('prod')) {
    // Mock api call used for mocking, should be replaced by correct call like in next api call
    const { data } = await mockApi.get(queryKey[0] as string);
    return data;
  }
  if(queryKey[1] === 'auth') {
    const { data } = await auth.get(queryKey[0] as string);
    return data;
  }
  const { data } = await mockApi.get(queryKey[0] as string);
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
