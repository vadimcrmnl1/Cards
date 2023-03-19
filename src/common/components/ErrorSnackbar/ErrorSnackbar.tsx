import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setAppErrorAC, setAppInfoAC} from "../../../app/actions";
import {selectAppInfo, selectError} from "../../../app/selectors";
import {selectPacksName} from "../../../features/table/Packs/selectors";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError)

    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (error !== null) {
            dispatch(setAppErrorAC(null))
        }
    };
    return (
        <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={'warning'} sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );


}
