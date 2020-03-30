import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PlayerDetailComponent from './components/PlayerDetailComponent';
import PlayerViewComponent from './components/PlayerViewComponent';

export default function PlayerComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/players"/>
            <Route path="/players/:id" component={PlayerDetailComponent} />
            <Route path="/players" component={PlayerViewComponent} />
        </Switch>
    )
}