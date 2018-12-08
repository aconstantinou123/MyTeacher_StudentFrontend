import { combineReducers } from 'redux'
import studentAuthentication from './studentAuthenticationReducer'
import student from './studentReducer'

const rootReducer = combineReducers({
  studentAuthentication,
  student,
})

export default rootReducer
