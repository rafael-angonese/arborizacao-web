import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  img: {
    width: '100%',
    borderRadius: '4px',
  },
  figure: {
    margin: 0,
    display: 'flex',
    marginBottom: '10px',
    breakInside: 'avoid',
  },
  container: {
    columnCount: '5',
    columnGap: '10px',
  }
}));

export default styles;
