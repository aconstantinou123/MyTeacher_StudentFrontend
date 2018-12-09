import {
  STUDENT_LOGIN,
  PERSIST_LOGIN,
} from '../types/types'

const defaultState = {
  studentLoggingIn: false,
  studentLoggedIn: false,
  studentLoginErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${STUDENT_LOGIN}_PENDING`:
      return {
        ...state,
        studentLoggingIn: true,
      }
    case `${STUDENT_LOGIN}_FULFILLED`:
      return {
        ...state,
        studentLoggingIn: false,
        studentLoggedIn: true,
        studentLoginErr: null,
      }
    case `${STUDENT_LOGIN}_REJECTED`:
      return {
        ...state,
        studentLoggingIn: false,
        studentLoggedIn: false,
        studentLoginErr: action.payload,
      }
    case `${PERSIST_LOGIN}_PENDING`:
      return {
        ...state,
        studentLoggingIn: true,
      }
    case `${PERSIST_LOGIN}_FULFILLED`:
      return {
        ...state,
        studentLoggingIn: false,
        studentLoggedIn: true,
        studentLoginErr: null,
      }
    case `${PERSIST_LOGIN}_REJECTED`:
      return {
        ...state,
        studentLoggingIn: false,
        studentLoggedIn: false,
        studentLoginErr: action.payload,
      }
    default:
      return state
  }
}
