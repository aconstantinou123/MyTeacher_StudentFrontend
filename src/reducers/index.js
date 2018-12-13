import { combineReducers } from 'redux'
import studentAuthentication from './studentAuthenticationReducer'
import student from './studentReducer'
import studentRecord from './studentRecordReducer'
import studentSchedule from './scheduleReducer'
import videoChat from './videoChatReducer'

const rootReducer = combineReducers({
  studentAuthentication,
  student,
  studentRecord,
  studentSchedule,
  videoChat,
})

export default rootReducer
