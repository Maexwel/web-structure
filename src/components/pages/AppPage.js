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

    const data = () => {
        const d = []
        for(let i = 0; i< 10000; i++){
            d.push({ fieldtest: `value ${i}`, id: i, field1: 'ok', field2: 'test', field3: 25, field4: '8pppp' });
        }
        return d
    }

    return (
        <div>
            <DataTable
                title="Test"
                onSelectChanged={(v) => console.log(v)}
                columns={[
                    {
                        label: "test1",
                        id: "fieldtest",
                    },
                    {
                        label: "action1",
                        id: "actions1id",
                        align: "center",
                        isAction: true,
                        component: (item) => (<Button>testButton</Button>),
                    }
                ]}
                data={data()}
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