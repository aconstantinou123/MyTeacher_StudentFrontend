import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ProtectedRoute = ({
  studentLoginErr, component: ComponentToRender, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      studentLoginErr ? (
        <Redirect to="/login" />
      ) : (
        <ComponentToRender {...props} />
      )
    )}
  />
)

ProtectedRoute.defaultProps = {
  studentLoginErr: null,
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  studentLoginErr: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    ...state.studentAuthentication,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
