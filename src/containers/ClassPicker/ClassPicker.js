import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import * as studentRecordActionCreators from '../../actions/studentRecordActions'
import * as scheduleActionCreators from '../../actions/scheduleActions'
import ClassCard from '../../components/ClassCard/ClassCard'

import './ClassPicker.scss'

class ClassPicker extends Component {
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
      availableClasses,
      selectClassToBook,
      history,
    } = this.props
    const classesSortedByDate = _.sortBy(availableClasses,
      availableClass => [moment(availableClass.date, 'DD-MM-YYYY'), -availableClass.startTime]).reverse()
    return classesSortedByDate
      .map(availableClass => (
        <ClassCard
          key={availableClass.classId}
          selectClassToBook={selectClassToBook}
          availableClass={availableClass}
          history={history}
        />
      ))
  }

  render() {
    const { availableClasses } = this.props
    return (
      <div>
        <h2>Please choose a class or classes to sign up for</h2>
        {
          availableClasses.length >= 1
          && (
          <div className="cardwrapper">
            {this.mapClasses()}
          </div>
          )

        }
        {
          !availableClasses.length
          && <div>Loading...</div>
        }
      </div>

    )
  }
}

ClassPicker.defaultProps = {
  availableClasses: null,
  student: null,
  studentRecord: null,
}

ClassPicker.propTypes = {
  availableClasses: PropTypes.arrayOf(PropTypes.object),
  selectClassToBook: PropTypes.func.isRequired,
  getStudentRecord: PropTypes.func.isRequired,
  student: PropTypes.object,
  getAvailableClasses: PropTypes.func.isRequired,
  studentRecord: PropTypes.object,
  history: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassPicker)
