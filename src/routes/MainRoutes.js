import React from 'react'
import { Route, Switch } from 'react-router-dom'

import WelcomePage from '../containers/WelcomePage/WelcomePage'
import StudentLogin from '../containers/StudentLogin/StudentLogin'

const MainRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/login" component={StudentLogin} />
    </Switch>
  </div>
)

export default MainRoutes
