import React from 'react';
import { AppPage } from '../components/pages';
import { routes as ROUTES } from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from '../components/pages/template/Page';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Page exact {...ROUTES.APP_ROUTE} component={AppPage} />
        </Switch>
    </BrowserRouter>
)

export default routes;