import React from 'react';
import { AppPage } from '../components/pages';
import { routes as ROUTES } from './routes';
import { BrowserRouter, Switch } from 'react-router-dom';
import Page from '../components/pages/templates/Page';
import TopbarPage from '../components/pages/templates/TopbarPage';

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Page exact {...ROUTES.APP_ROUTE} component={AppPage} />
            <TopbarPage exact {...ROUTES.APP_ROUTE} component={AppPage} />
        </Switch>
    </BrowserRouter>
)

export default routes;