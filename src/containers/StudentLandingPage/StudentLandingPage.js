import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'
import * as scheduleActionCreators from '../../actions/scheduleActions'

class StudentLandingPage extends Component {
  componentWillMount() {
    const {
      student,
      getStudentRecord,
      studentRecord,
      getAvailableClasses,
      getClassHistory,
    } = this.props
    if (student) {
      getStudentRecord(student.username)
      getClassHistory(student.username)
    }
    if (studentRecord) {
      getAvailableClasses(student.studentLevel)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      student,
      getStudentRecord,
      studentRecord,
      getAvailableClasses,
      getClassHistory,
    } = this.props
    if (student !== nextProps.student && nextProps.student.username) {
      getStudentRecord(nextProps.student.username)
      getClassHistory(nextProps.student.username)
    } else if (studentRecord !== nextProps.studentRecord && nextProps.studentRecord.studentLevel) {
      getAvailableClasses(nextProps.studentRecord.studentLevel, nextProps.student.username)
    }
  }

  render() {
    const { student } = this.props
    return (
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
                <Link to="/booked">My classes</Link>
                <br />
                <Link to="/history">My class history</Link>
                <br />
                <Link to="/class">Start Class</Link>
              </div>
            </div>
            )

          }
      </div>
    )
  }
}

StudentLandingPage.defaultProps = {
  student: null,
  studentRecord: null,
}

StudentLandingPage.propTypes = {
  getStudentRecord: PropTypes.func.isRequired,
  student: PropTypes.object,
  getAvailableClasses: PropTypes.func.isRequired,
  studentRecord: PropTypes.object,
  getClassHistory: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...studentRecordActionCreators,
    ...scheduleActionCreators,
  }, dispatch)
}


function mapStateToProps(state) {
  return {
    ...state.student,
    ...state.studentRecord,
    ...state.studentAuthentication,
    ...state.studentSchedule,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentLandingPage)
