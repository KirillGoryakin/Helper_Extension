import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { App } from './App';
import './popup.scss';

const theme = extendTheme({
  colors: {
    primary: '#e1a72b',
    secondary: {
      50: '#dcfff6',
      100: '#afffe8',
      200: '#80ffd8',
      300: '#51ffc9',
      400: '#2bfebb',
      500: '#1be6a1',
      600: '#0cb37d',
      700: '#008059',
      800: '#004d34',
      900: '#001c10',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('popup_root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);