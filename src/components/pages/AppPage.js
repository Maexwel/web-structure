import React from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const AppPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar("Welcome to Web Structure project", { variant: "info" });
        enqueueSnackbar("Welcome to Web Structure project", { variant: "success" });
        enqueueSnackbar("Welcome to Web Structure project", { variant: "error" });
    }, [enqueueSnackbar])

    return (
        <div>
            App
        </div>
    )
}
export default AppPage;