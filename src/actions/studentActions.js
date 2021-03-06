import axios from 'axios'
import { init } from '../store/websocketsInit'
import store from '../store/store'

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
    dispatch(getStudentFulfilled(response.data))
    init(store)
  } catch (err) {
    dispatch(getStudentRejected(err))
  }
}
