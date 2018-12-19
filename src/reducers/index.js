import { combineReducers } from 'redux'
import studentAuthentication from './studentAuthenticationReducer'
import student from './studentReducer'
import studentRecord from './studentRecordReducer'
import studentSchedule from './scheduleReducer'
import videoChat from './videoChatReducer'
import webSocket from './webSocketReducer'

const rootReducer = combineReducers({
  studentAuthentication,
  student,
  studentRecord,
  studentSchedule,
  videoChat,
  webSocket,
})

export default rootReducer
