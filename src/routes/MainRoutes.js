import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute' 

import WelcomePage from '../containers/WelcomePage/WelcomePage'
import StudentLogin from '../containers/StudentLogin/StudentLogin'
import StudentLandingPage from '../containers/StudentLandingPage/StudentLandingPage'

const MainRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/login" component={StudentLogin} />
      <ProtectedRoute path="/student" component={StudentLandingPage} />
    </Switch>
  </div>
)

export default MainRoutes
