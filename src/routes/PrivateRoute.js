import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
  student, component: ComponentToRender, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      !student ? (
        <Redirect to="/student" />
      ) : (
        <ComponentToRender {...props} />
      )
    )}
  />
)

PrivateRoute.defaultProps = {
  student: null,
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  student: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    ...state.student,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
