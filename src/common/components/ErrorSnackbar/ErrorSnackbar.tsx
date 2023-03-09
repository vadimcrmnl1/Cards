import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setAppErrorAC, setAppInfoAC} from "../../../app/AppReducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ErrorSnackbar = () => {

    const dispatch = useAppDispatch();
    const error = useAppSelector<string | null>(state => state.app.error)
    const appInfo = useAppSelector<string | null>(state => state.app.appInfo)

    const severity = error
        ? 'error'
        : 'info'
    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
        dispatch(setAppInfoAC(null))
    };

    return (
        <Snackbar open={(error || appInfo) !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {error || appInfo}
            </Alert>
        </Snackbar>
    );
}
