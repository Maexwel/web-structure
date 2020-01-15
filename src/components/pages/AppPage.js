import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { ServiceLocatorContext } from '../context';

const AppPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { notificationFactory } = useContext(ServiceLocatorContext); // Notification factory

    useEffect(() => {
        const errorNotification = notificationFactory.buildNotification('Welcome message', 'Welcome in the web-structure template app ! Enjoy !', 'success');
        enqueueSnackbar(errorNotification);
    }, [enqueueSnackbar, notificationFactory])

    return (
        <div>
            App
        </div>
    )
}
export default AppPage;