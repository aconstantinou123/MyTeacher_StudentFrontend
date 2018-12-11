import axios from 'axios'
import _ from 'lodash'

import {
  GET_AVAILABLE_CLASSES,
  SELECT_CLASS_TO_BOOK,
  BOOK_CLASS,
} from '../types/types'

export const selectClassToBook = availableClass => ({
  type: SELECT_CLASS_TO_BOOK,
  payload: availableClass,
})

export const getAvailableClassesPending = () => ({ type: `${GET_AVAILABLE_CLASSES}_PENDING` })
export const getAvailableClassesFulfilled = (availableClasses, bookedClasses) => ({
  type: `${GET_AVAILABLE_CLASSES}_FULFILLED`,
  payload: {
    availableClasses,
    bookedClasses,
  },
})
export const getAvailableClassesRejected = err => ({
  type: `${GET_AVAILABLE_CLASSES}_REJECTED`,
  payload: err.message,
})

export const getAvailableClasses = (classLevel, username) => async (dispatch) => {
  dispatch(getAvailableClassesPending())
  try {
    const response = await axios.get(`${process.env.SCHEDULE_URL}/slots/${classLevel}`)
    const duplicateClassedRemoved = _.uniqBy(response.data, slot => slot.classId)
    const bookedClasses = duplicateClassedRemoved
      .filter(availableClass => availableClass.students
        .some(studentUsername => studentUsername === username))
    const availableClasses = duplicateClassedRemoved
      .filter(availableClass => availableClass.students.indexOf(username) === -1)
    dispatch(getAvailableClassesFulfilled(availableClasses, bookedClasses))
  } catch (err) {
    dispatch(getAvailableClassesRejected(err))
  }
}

export const bookClassPending = () => ({ type: `${BOOK_CLASS}_PENDING` })
export const bookClassFulfilled = (availableClasses, bookedClasses) => ({
  type: `${BOOK_CLASS}_FULFILLED`,
  payload: {
    availableClasses,
    bookedClasses,
  },
})
export const bookClassRejected = err => ({
  type: `${BOOK_CLASS}_REJECTED`,
  payload: err.message,
})

export const bookClass = (username, classId) => async (dispatch) => {
  dispatch(bookClassPending())
  const body = {
    username,
    classId,
  }
  try {
    const response = await axios.put(`${process.env.SCHEDULE_URL}/book-slot`, body)
    const duplicateClassedRemoved = _.uniqBy(response.data, slot => slot.classId)
    const bookedClasses = duplicateClassedRemoved
      .filter(availableClass => availableClass.students
        .some(studentUsername => studentUsername === username))
    const availableClasses = duplicateClassedRemoved
      .filter(availableClass => availableClass.students.indexOf(username) === -1)
    dispatch(bookClassFulfilled(availableClasses, bookedClasses))
  } catch (err) {
    dispatch(bookClassRejected(err))
  }
}
