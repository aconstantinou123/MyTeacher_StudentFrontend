import {
  GET_STUDENT_RECORD,
} from '../types/types'

const defaultState = {
  studentRecordFetching: false,
  studentRecordFetched: false,
  studentRecord: null,
  studentRecordErr: null,
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case `${GET_STUDENT_RECORD}_PENDING`:
      return {
        ...state,
        studentRecordFetching: true,
      }
    case `${GET_STUDENT_RECORD}_FULFILLED`:
      return {
        ...state,
        studentRecordFetching: false,
        studentRecordFetched: true,
        studentRecord: action.payload,
        studentRecordErr: null,
      }
    case `${GET_STUDENT_RECORD}_REJECTED`:
      return {
        studentRecordFetching: false,
        studentRecordFetched: false,
        studentRecordErr: action.payload,
      }
    default:
      return state
  }
}
