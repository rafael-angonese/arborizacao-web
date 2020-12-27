import { makeStyles } from '@material-ui/core/styles';

const imageSize = 80;
export default makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogoRoot: {
    marginTop: imageSize * -1,
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.primary.dark,
    padding: 20,
    width: imageSize + 40,
    height: imageSize + 40,
    borderRadius: (imageSize + 140) / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  imageLogo: {
    height: imageSize,
  },
  paper: {
    width: 450,
    marginTop: imageSize * -1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));
