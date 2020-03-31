import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LayoutSplashScreen } from "../../../_metronic";

const Player = lazy(() =>
  import("./player/PlayerComponent")
);

const Bet = lazy(() =>
  import("./bets/BetComponent")
);

const Affiliate = lazy(() =>
  import("./affiliate/AffiliateComponent")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/players" component={Player} />
        <Route path="/bets" component={Bet} />
        <Route path="/affiliate" component={Affiliate} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
