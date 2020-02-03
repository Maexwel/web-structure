import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { ServiceLocatorContext } from '../context';
import { DataTable, TextField, ComboBox } from '../ui-kit';
import { Grid } from '@material-ui/core';
import ActionButton from '../ui-kit/buttons/ActionButton/ActionButton';

const AppPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { notificationFactory } = useContext(ServiceLocatorContext); // Notification factory

    useEffect(() => {
        const errorNotification = notificationFactory.buildNotification({ title: 'Welcome message', content: 'Welcome in the web-structure template app ! Enjoy !', variant: 'success' });
        enqueueSnackbar(errorNotification, { persist: true });
    }, [enqueueSnackbar, notificationFactory]);

    const data = () => {
        const d = []
        for (let i = 0; i < 10000; i++) {
            d.push({ fieldtest: `value ${i}`, id: i, field1: 'ok', field2: 'test', field3: 25, field4: '8pppp' });
        }
        return d;
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
                        label: "actions",
                        id: "actions",
                        align: "center",
                        isAction: true,
                        component: (item) => (<Grid container justify="center" alignItems="center"><Grid item><ActionButton color="primary" label="view" onClick={(e) => console.log(item)} /></Grid><Grid item><ActionButton type="icon" tip="edit item" icon="edit" label="view" onClick={() => console.log(`edit item ${item.id}`)} /></Grid></Grid>),
                    },
                ]}
                data={data()}
                actions={
                    [
                        {
                            component: (selectedItems) => (<ActionButton tip="action on selected items" color="secondary" label="action1" disabled={selectedItems.length <= 0} onClick={(e) => alert(JSON.stringify(selectedItems))} />),
                        }
                    ]
                }
            />
            <br />
            <TextField name="test" placeholder="test" label="test" />
            <br />
            <ComboBox label="test" options={[{ label: 'test', value: 1 }]} />
        </div>
    )
}
export default AppPage;