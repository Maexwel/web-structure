import React from 'react';
import { AppPage } from '../components/pages';
import { routes as ROUTES } from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from '../components/pages/template/Page';
import TopbarPage from '../components/pages/template/TopbarPage';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <TopbarPage exact {...ROUTES.APP_ROUTE} component={AppPage} />
            <Page exact {...ROUTES.APP_ROUTE} component={AppPage} />
        </Switch>
    </BrowserRouter>
)

export default routes;