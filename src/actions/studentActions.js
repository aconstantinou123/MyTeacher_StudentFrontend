import axios from 'axios'

import {
  GET_STUDENT,
} from '../types/types'

export const getStudentPending = () => ({ type: `${GET_STUDENT}_PENDING` })
export const getStudentFulfilled = payload => ({
  type: `${GET_STUDENT}_FULFILLED`,
  payload,
})
export const getStudentRejected = err => ({
  type: `${GET_STUDENT}_REJECTED`,
  payload: err.message,
})

export const getStudent = username => async (dispatch) => {
  dispatch(getStudentPending())
  try {
    const response = await axios.get(`${process.env.STUDENT_URL}/${username}`)
    axios.defaults.headers.common.Authorization = response.headers.authorization
    dispatch(getStudentFulfilled(response.data))
  } catch (err) {
    dispatch(getStudentRejected(err))
  }
}