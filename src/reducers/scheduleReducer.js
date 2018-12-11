import {
  GET_AVAILABLE_CLASSES,
} from '../types/types'

const defaultState = {
  studentScheduleFetching: false,
  studentScheduleFetched: false,
  availableClasses: [],
  studentScheduleErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GET_AVAILABLE_CLASSES}_PENDING`:
      return {
        ...state,
        studentScheduleFetching: true,
      }
    case `${GET_AVAILABLE_CLASSES}_FULFILLED`:
      return {
        ...state,
        studentScheduleFetching: false,
        studentScheduleFetched: true,
        availableClasses: action.payload,
        studentScheduleErr: null,
      }
    case `${GET_AVAILABLE_CLASSES}_REJECTED`:
      return {
        ...state,
        studentScheduleFetching: false,
        studentScheduleFetched: false,
        availableClasses: null,
        studentScheduleErr: action.payload,
      }
    default:
      return state
  }
}
