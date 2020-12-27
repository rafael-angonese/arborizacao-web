import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AuthProvider } from 'contexts/auth';
import 'react-toastify/dist/ReactToastify.css';
import themeStyles from 'assets/styles/theme';

import Pages from 'pages';

const App = () => {
  const theme = createMuiTheme(themeStyles);

  toast.configure();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Pages />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
