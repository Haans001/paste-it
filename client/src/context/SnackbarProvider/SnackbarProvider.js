import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

const styles = {
    success: { fontSize: '1.4rem', backgroundColor: '#27ae60 !important' },
    error: { fontSize: '1.4rem', backgroundColor: '#ee5253 !important' },
    warning: { fontSize: '1.4rem' },
    info: { fontSize: '1.4rem' }
};

const useStyles = makeStyles(styles);

const SnackbarProvider = ({ children }) => {
    const classes = useStyles();

    return (
        <NotistackSnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info
            }}>
            {children}
        </NotistackSnackbarProvider>
    );
};

SnackbarProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default SnackbarProvider;
