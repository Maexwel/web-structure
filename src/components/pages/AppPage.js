import React from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const AppPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar("des");
    }, [enqueueSnackbar])

    return (
        <div>
            App
        </div>
    )
}
export default AppPage;