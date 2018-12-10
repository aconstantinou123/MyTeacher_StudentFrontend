import { combineReducers } from 'redux'
import studentAuthentication from './studentAuthenticationReducer'
import student from './studentReducer'
import studentRecord from './studentRecordReducer'
import studentSchedule from './scheduleReducer'

const rootReducer = combineReducers({
  studentAuthentication,
  student,
  studentRecord,
  studentSchedule,
})

export default rootReducer
