import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

const styles = {
    success: { fontSize: '1.4rem' },
    error: { fontSize: '1.4rem' },
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

export default SnackbarProvider;
