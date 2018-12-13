import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'
import * as scheduleActionCreators from '../../actions/scheduleActions'

import './ClassHistory.scss'
import BookedClass from '../../components/BookedClass/BookedClass'

class ClassHistory extends Component {
  constructor() {
    super()
    this.mapClasses = this.mapClasses.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {
      student,
      getStudentRecord,
      getClassHistory,
    } = this.props
    if (student !== nextProps.student && nextProps.student.username) {
      getStudentRecord(nextProps.student.username)
      getClassHistory(nextProps.student.username)
    }
  }

  mapClasses() {
    const {
      classHistory,
    } = this.props
    const classesSortedByDate = _.sortBy(classHistory,
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
    const { classHistory } = this.props
    return (
      <div>
        <h2>Your previous classes</h2>
        {
          classHistory.length >= 1
          && (
          <div className="cardwrapper">
            {this.mapClasses()}
          </div>
          )

        }
        {
          !classHistory.length
          && <div>Loading...</div>
        }
      </div>

    )
  }
}

ClassHistory.defaultProps = {
  classHistory: null,
  student: null,
}

ClassHistory.propTypes = {
  classHistory: PropTypes.arrayOf(PropTypes.object),
  getStudentRecord: PropTypes.func.isRequired,
  student: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassHistory)
