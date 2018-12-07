import React from 'react'
import { Route, Switch } from 'react-router-dom'

import WelcomePage from '../containers/WelcomePage/WelcomePage'

const MainRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
    </Switch>
  </div>
)

export default MainRoutes
