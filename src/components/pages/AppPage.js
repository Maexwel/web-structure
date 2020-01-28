import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { ServiceLocatorContext } from '../context';
import { DataTable } from '../ui-kit';
import { Button } from '@material-ui/core';

const AppPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { notificationFactory } = useContext(ServiceLocatorContext); // Notification factory

    useEffect(() => {
        const errorNotification = notificationFactory.buildNotification({ title: 'Welcome message', content: 'Welcome in the web-structure template app ! Enjoy !', variant: 'success' });
        enqueueSnackbar(errorNotification);
    }, [enqueueSnackbar, notificationFactory]);

    return (
        <div>
            <DataTable
                title="Test"
                onSelectChanged={(v) => console.log(v)}
                columns={[
                    {
                        label: "test1",
                        id: "field1",
                        format: (val) => `${val} ...`,
                    },
                    {
                        label: "action1",
                        id: "actions1id",
                        align: "center",
                        isAction: true,
                        component: (item) => (<Button>testButton</Button>),
                    }
                ]}
                data={[
                    { field1: 'premiere value', id: '1' },
                    { field1: 'deuxième value', id: '2' },
                    { field1: 'troisième value', id: '3' },
                    { field1: 'quatrième value', id: '4' },
                    { field1: 'cinquième value', id: '5' },
                ]}
                actions={
                    [
                        {
                            component: (selectedItems) => (<Button disabled={selectedItems.length <= 0} onClick={(e) => alert(JSON.stringify(selectedItems))}>testaction</Button>),
                        }
                    ]
                }
            />
        </div>
    )
}
export default AppPage;