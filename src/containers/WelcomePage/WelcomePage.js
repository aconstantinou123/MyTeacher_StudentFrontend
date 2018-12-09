import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './WelcomePage.scss'

const WelcomePage = ({ student }) => (
  <div>
    <h1>myTeacher</h1>
    <p>Welcome to myTeacher - Student Portal. Please login to continue or proceed your account</p>
    {
          student
          && <Link to="/studentt">Go to Student Page</Link>
        }
    {
          !student
          && <Link to="login">Login </Link>
        }
  </div>
)

WelcomePage.defaultProps = {
  student: null,
}

WelcomePage.propTypes = {
  student: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    ...state.student,
  }
}

export default connect(mapStateToProps)(WelcomePage)
