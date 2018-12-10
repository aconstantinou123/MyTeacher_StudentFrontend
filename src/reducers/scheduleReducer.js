import {
  GET_STUDENT_SCHEDULE,
} from '../types/types'

const defaultState = {
  studentScheduleFetching: false,
  studentScheduleFetched: false,
  schedule: [],
  studentScheduleErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GET_STUDENT_SCHEDULE}_PENDING`:
      return {
        ...state,
        studentScheduleFetching: true,
      }
    case `${GET_STUDENT_SCHEDULE}_FULFILLED`:
      return {
        ...state,
        studentScheduleFetching: false,
        studentScheduleFetched: true,
        schedule: action.payload,
        studentScheduleErr: null,
      }
    case `${GET_STUDENT_SCHEDULE}_REJECTED`:
      return {
        ...state,
        studentScheduleFetching: false,
        studentScheduleFetched: false,
        schedule: null,
        studentScheduleErr: action.payload,
      }
    default:
      return state
  }
}
