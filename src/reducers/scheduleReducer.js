import {
  GET_AVAILABLE_CLASSES,
  SELECT_CLASS_TO_BOOK,
  BOOK_CLASS,
  GET_CLASS_HISTORY,
} from '../types/types'

const defaultState = {
  classHistoryFetching: false,
  classHistoryFetched: false,
  classHistory: [],
  classHistoryErr: null,
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
    case `${GET_CLASS_HISTORY}_PENDING`:
      return {
        ...state,
        classHistoryFetching: true,
      }
    case `${GET_CLASS_HISTORY}_FULFILLED`:
      return {
        ...state,
        classHistoryFetching: false,
        classHistoryFetched: true,
        classHistory: action.payload,
        classHistoryErr: null,
      }
    case `${GET_CLASS_HISTORY}_REJECTED`:
      return {
        ...state,
        classHistoryFetching: false,
        classHistoryFetched: false,
        classHistoryErr: action.payload,
      }
    default:
      return state
  }
}
