import pink from '@material-ui/core/colors/pink';

const primary = {
  light: '#00CCFF',
  main: '#2F84FF',
  dark: '#003CFF',
  contrastText: '#f8f8f8',
};

const blue = {
  light: '#DEEBFF',
  main: '#2F84FF',
  dark: '#003CFF',
  contrastText: '#f8f8f8',
};

const purple = {
  light: '#644FF6',
  main: '#AC92EA',
  dark: '#9E4FF6',
  contrastText: '#f8f8f8',
};

const black = {
  main: '#000000',
  contrastText: '#ffffff',
};

const green = {
  light: '#00E36B',
  main: '#40D5A0',
  dark: '#00E3BC',
  contrastText: '#f8f8f8',
};

const orange = {
  light: '#FDA947',
  main: '#FB9D06',
  dark: '#FDC347',
  contrastText: '#f8f8f8',
};

const red = {
  light: '#F82A79',
  main: '#EF717A',
  dark: '#F8392A',
  contrastText: '#f8f8f8',
};

const rose = {
  light: pink[300],
  main: pink[500],
  dark: pink[700],
  contrastText: '#fff',
  rgb: {
    light: '240, 98, 146',
    main: '233, 30, 99',
    dark: '194, 24, 91',
  },
};

const grey = {
  main: '#757575',
  contrastText: '#f8f8f8',
};

export default {
  palette: {
    primary: green,
    secondary: purple,
    success: green,
    warning: orange,
    error: red,
    blue,
    purple,
    green,
    orange,
    red,
    black,
    grey,
    rose,
    falta: {
      light: '#F82A79',
      main: '#EF717A',
      dark: '#F8392A',
      contrastText: '#f8f8f8',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        padding: 10,
        fontSize: '0.8rem',
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#ffffff',
      },
      root: {
        height: 3,
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.6em',
          height: '0.6em',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(122, 153, 217, 0.8)',
        },
      }
    }
  },
};
