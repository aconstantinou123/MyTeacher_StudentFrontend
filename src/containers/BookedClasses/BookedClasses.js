import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'
import * as scheduleActionCreators from '../../actions/scheduleActions'

import './BookedClasses.scss'
import BookedClass from '../../components/BookedClass/BookedClass'

class BookedClasses extends Component {
  constructor() {
    super()
    this.mapClasses = this.mapClasses.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {
      student,
      getStudentRecord,
      studentRecord,
      getAvailableClasses,
    } = this.props
    if (student !== nextProps.student && nextProps.student.username) {
      getStudentRecord(nextProps.student.username)
    } else if (studentRecord !== nextProps.studentRecord && nextProps.studentRecord.studentLevel) {
      getAvailableClasses(nextProps.studentRecord.studentLevel, nextProps.student.username)
    }
  }

  mapClasses() {
    const {
      bookedClasses,
    } = this.props
    const classesSortedByDate = _.sortBy(bookedClasses,
      bookedClass => [moment(bookedClass.date, 'DD-MM-YYYY'), -bookedClass.startTime]).reverse()
    return classesSortedByDate
      .map(bookedClass => (
        <BookedClass
          key={bookedClass.classId}
          bookedClass={bookedClass}
        />
      ))
  }

  render() {
    const { bookedClasses } = this.props
    return (
      <div>
        <h2>Your booked classes</h2>
        {
          bookedClasses.length >= 1
          && (
          <div className="cardwrapper">
            {this.mapClasses()}
          </div>
          )

        }
        {
          !bookedClasses.length
          && <div>Loading...</div>
        }
      </div>

    )
  }
}

BookedClasses.defaultProps = {
  bookedClasses: null,
  student: null,
  studentRecord: null,
}

BookedClasses.propTypes = {
  bookedClasses: PropTypes.arrayOf(PropTypes.object),
  getStudentRecord: PropTypes.func.isRequired,
  student: PropTypes.object,
  getAvailableClasses: PropTypes.func.isRequired,
  studentRecord: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(BookedClasses)
