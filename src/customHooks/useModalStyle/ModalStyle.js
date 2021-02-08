import { makeStyles } from '@material-ui/core/styles';
export const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#263238',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
}));