import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PropTypes from 'prop-types'

import WelcomePage from '../containers/WelcomePage/WelcomePage'
import StudentLogin from '../containers/StudentLogin/StudentLogin'
import StudentLandingPage from '../containers/StudentLandingPage/StudentLandingPage'
import ClassPicker from '../containers/ClassPicker/ClassPicker'
import ConfirmClass from '../containers/ConfirmClass/ConfirmClass';
import PrivateRoute from './PrivateRoute';

const MainRoutes = ({ history }) => (
  <div>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/login" component={StudentLogin} />
      <ProtectedRoute path="/student" component={StudentLandingPage} />
      <ProtectedRoute history={history} exact path="/schedule" component={ClassPicker} />
      <PrivateRoute history={history} path="/schedule/confirm" component={ConfirmClass} />
    </Switch>
  </div>
)

MainRoutes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MainRoutes
