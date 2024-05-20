import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Layout } from './Layout';
import { GlobalStyle } from '@/Globalstyle';
import { theme } from '@/Theme';
import { routes } from '@/routes';

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'));

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path={routes.HOME}
          element={<Layout />}
        >
          <Route
            index
            element={<MainPage />}
          />
        </Route>
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};
