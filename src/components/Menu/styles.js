import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 280;

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  list: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  listItem: {
    float: 'left',
    width: 'auto',
    margin: '0',
    padding: '0',
  },
  navLink: {
    color: 'inherit',
    padding: '0.9375rem',
    fontSize: '12px',
    borderRadius: '3px',
    display: 'inline-flex',
    '&:hover,&:focus': {
      color: 'inherit',
      background: 'rgba(200, 200, 200, 0.2)',
    },
  },
  navLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  divider: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  drawer: {
    flexShrink: 0,
    height: '100vh',
    position: 'fixed',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  rootSelected: {
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    borderRadius: 5,
  },
  textItem: {
    color: theme.palette.primary.contrastText,
  },
  textSelected: {
    color: theme.palette.primary.main,
  },
}));
