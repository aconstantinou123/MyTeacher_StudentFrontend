import { combineReducers } from 'redux'
import studentAuthentication from './studentAuthenticationReducer'
import student from './studentReducer'
import studentRecord from './studentRecordReducer'

const rootReducer = combineReducers({
  studentAuthentication,
  student,
  studentRecord,
})

export default rootReducer
