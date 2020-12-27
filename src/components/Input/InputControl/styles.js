import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  root: {
    marginTop: 30,
  },
  formControlRoot: {
    margin: '10px 0px 10px 0px',
  },
  inputRoot: {
    fontSize: '1rem',
  },
  inputWithoutLabel: {
    marginTop: '0 !important',
  },
  inputElement: {
    padding: '6px 0 8px',
    marginTop: '2px',
  },
  labelRoot: {
    color: '#505050',
    fontWeight: '500',
    fontSize: '1rem',
  },
  labelFocused: {
    '&.focused': {
      color: '#505050',
    },
  },
  labelShrink: {
    transform: 'translate(0, 1.5px) scale(0.8)',
  },
  labelFormControlWYSIWYG: {
    position: 'relative',
    marginBottom: 8,
  },
  labelDisabled: {
    fontWeight: 'normal',
  },
  inputDisabled: {
    color: 'black',
  },
  dropzone: {
    backgroundColor: 'red',
  },
  asterisk: {
    color: 'red',
  },
}));

export default styles;
