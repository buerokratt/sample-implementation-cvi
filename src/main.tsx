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
import './scss/main.scss';

// **** Query client ****
// Query client part is not directly raleted to layout so it is optional
// But many components need to get some data from API sources, so every solution probably needs this

const defaultQueryFn: QueryFunction | undefined = async ({ queryKey }) => {
  return queryKey;
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