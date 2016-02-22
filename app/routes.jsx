import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import Feed from 'components/Feed';
import Search from 'components/Search';
import Profile from 'components/Profile';
import Repos from 'components/Repos';
import Repo from 'components/Repo'

const Routes = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/feed" component={Feed} />
    <Route path="/search" component={Search} />
    <Route path="/@:login" component={Profile}>
      <IndexRoute component={Repos} />
      <Route path=":repo" component={Repo} />
    </Route>
  </Route>
</Router>;

export default Routes;
