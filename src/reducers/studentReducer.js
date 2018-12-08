import {
  GET_STUDENT,
} from '../types/types'

const defaultState = {
  studentFetching: false,
  studentFetched: false,
  student: null,
  studentErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GET_STUDENT}_PENDING`:
      return {
        ...state,
        studentFetching: true,
      }
    case `${GET_STUDENT}_FULFILLED`:
      return {
        ...state,
        studentFetching: false,
        studentFetched: true,
        student: action.payload,
        studentErr: null,
      }
    case `${GET_STUDENT}_REJECTED`:
      return {
        ...state,
        studentFetching: false,
        studentFetched: false,
        student: null,
        studentErr: action.payload,
      }
    default:
      return state
  }
}
