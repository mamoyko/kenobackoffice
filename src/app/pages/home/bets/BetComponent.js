import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BetViewComponent from './components/BetViewComponent';

export default function BetComponent() {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/bets"/>
            <Route path="/bets" component={BetViewComponent} />
        </Switch>
    )
}