import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StudentLandingPage = ({ student }) => (
  <div>
    {
      student
      && (
      <div>
        <h1>
Welcome
          {' '}
          {student.firstName}
        </h1>
        <div>
          <Link to="/student-records">My Teacher</Link>
          <br />
          <Link to="/schedule">Choose a class</Link>
          <br />
          <Link to="class">Start Class</Link>
        </div>
      </div>
      )

    }
  </div>
)

StudentLandingPage.defaultProps = {
  student: null,
}

StudentLandingPage.propTypes = {
  student: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    ...state.student,
    ...state.studentAuthentication,
  }
}

export default connect(mapStateToProps)(StudentLandingPage)
