import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AffiliateViewComponent from './components/AffiliateViewComponent';
import AffiliateDetailComponent from './components/AffiliateDetailComponent';

export default function AffiliateComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/affiliate"/>
            <Route path="/affiliate/:id" component={AffiliateDetailComponent} />
            <Route path="/affiliate" component={AffiliateViewComponent} />
        </Switch>
    )
}