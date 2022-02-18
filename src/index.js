import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {flashless, FlashlessScript} from 'chakra-ui-flashless';
import { mode } from '@chakra-ui/theme-tools'

const config = extendTheme(
  flashless({
    styles: {
      global: (props) => ({
        fonts: {
          heading: 'Open Sans',
          body: 'Raleway',
        },
        body: {
          color: mode('black', 'whiteAlpha.900')(props),
          bg: mode('white', 'black')(props),
        },
      })
    }
  })
)
ReactDOM.render(
  <StrictMode>
    <FlashlessScript theme={config} />
    <App />
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
