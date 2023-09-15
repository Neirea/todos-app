import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MainRouter } from '../navigation';
import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: false
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const AppContainer = () => (
  <MuiThemeProvider theme={darkTheme}>
    <StyledThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledThemeProvider>
  </MuiThemeProvider>
);

export default AppContainer;
