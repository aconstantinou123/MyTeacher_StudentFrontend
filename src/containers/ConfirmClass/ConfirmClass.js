import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { displayClassLevel, displayClassType } from '../../helperFunctions/displayFunctions'
import * as scheduleActionCreators from '../../actions/scheduleActions'

const ConfirmClass = ({ selectedClass, history, bookClass, student }) => {
    const handleBookClicked = () => {
      bookClass(student.username, selectedClass.classId)
      history.push("/student")
    } 
    return (
      <div>
      <h2>Confirm Selected Class</h2>
      <h2>
  Date:
        {selectedClass.date}
      </h2>
      <h3>
  Start time:
        {selectedClass.startTime}
      </h3>
      <h3>
  End time:
        {selectedClass.endTime}
      </h3>
      <h3>
  Class type:
        {displayClassType(selectedClass)}
      </h3>
      <h3>
  Class level:
        {displayClassLevel(selectedClass)}
      </h3>
      <h3>
  Class capacity:
        {selectedClass.capacity}
      </h3>
      <h4>
  Class description:
        {selectedClass.classDescription}
      </h4>
      <button type="button" onClick={handleBookClicked}>Book Class</button>
      <button type="button" onClick={() => history.goBack()}>Go Back</button>
    </div>
    )
}

ConfirmClass.defaultProps = {
  selectedClass: null,
  student: null,
}

ConfirmClass.propTypes = {
  student: PropTypes.object,
  selectedClass: PropTypes.object,
  history: PropTypes.object.isRequired,
  bookClass: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...scheduleActionCreators,
  }, dispatch)
}


function mapStateToProps(state) {
  return {
    ...state.student,
    ...state.studentSchedule,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmClass)