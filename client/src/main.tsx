import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import theme from './theme';

const rootElement: React.ReactNode = (
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(rootElement);
