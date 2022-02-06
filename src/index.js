import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import theme from './theme'

ReactDOM.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
