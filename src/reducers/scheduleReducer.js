import {
  GET_AVAILABLE_CLASSES,
  SELECT_CLASS_TO_BOOK,
  BOOK_CLASS,
} from '../types/types'

const defaultState = {
  bookingClass: false,
  bookedClass: false,
  bookingErr: null,
  studentScheduleFetching: false,
  studentScheduleFetched: false,
  availableClasses: [],
  bookedClasses: [],
  studentScheduleErr: null,
  selectedClass: null,
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
        availableClasses: action.payload.availableClasses,
        bookedClasses: action.payload.bookedClasses,
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
    case SELECT_CLASS_TO_BOOK:
      return {
        ...state,
        selectedClass: action.payload,
      }
    case `${BOOK_CLASS}_PENDING`:
      return {
        ...state,
        bookingClass: true,
      }
    case `${BOOK_CLASS}_FULFILLED`:
      return {
        ...state,
        bookingClass: false,
        bookedClass: true,
        availableClasses: action.payload.availableClasses,
        bookedClasses: action.payload.bookedClasses,
        bookingErr: null,
      }
    case `${BOOK_CLASS}_REJECTED`:
      return {
        ...state,
        bookingClass: false,
        bookedClass: false,
        bookingErr: action.payload,
      }
    default:
      return state
  }
}
