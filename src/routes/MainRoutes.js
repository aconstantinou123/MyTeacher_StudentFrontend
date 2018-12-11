import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import WelcomePage from '../containers/WelcomePage/WelcomePage'
import StudentLogin from '../containers/StudentLogin/StudentLogin'
import StudentLandingPage from '../containers/StudentLandingPage/StudentLandingPage'
import ClassPicker from '../containers/ClassPicker/ClassPicker'

const MainRoutes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/login" component={StudentLogin} />
      <ProtectedRoute path="/student" component={StudentLandingPage} />
      <ProtectedRoute path="/schedule" component={ClassPicker} />
    </Switch>
  </div>
)

export default MainRoutes
