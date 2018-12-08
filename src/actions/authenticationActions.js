import axios from 'axios'
import { getStudent } from './studentActions'

import {
  STUDENT_LOGIN,
} from '../types/types'

export const loginStudentPending = () => ({ type: `${STUDENT_LOGIN}_PENDING` })
export const loginStudentFulfilled = payload => ({
  type: `${STUDENT_LOGIN}_FULFILLED`,
  payload,
})
export const loginStudentRejected = err => ({
  type: `${STUDENT_LOGIN}_REJECTED`,
  payload: err.message,
})

export const loginStudent = details => async (dispatch) => {
  dispatch(loginStudentPending())
  try {
    const response = await axios.post(`${process.env.STUDENT_URL}/login`, details)
    axios.defaults.headers.common.Authorization = response.headers.authorization
    dispatch(loginStudentFulfilled(response.data))
    dispatch(getStudent(details.username))
  } catch (err) {
    dispatch(loginStudentRejected(err))
  }
}