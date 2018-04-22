import React from "react";
import { render } from "react-dom";
import { Provider  } from 'mobx-react';
import stores from './Stores';
import App from './components/App'
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

render(
  <div>
      <Provider RootStore={new stores.RootStore()}>
          <MuiThemeProvider theme={createMuiTheme(theme)} >
              <App/>
          </MuiThemeProvider>
      </Provider>
  </div>,
  document.getElementById("root")
);

