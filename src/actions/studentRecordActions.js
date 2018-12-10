import axios from 'axios'

import {
  GET_STUDENT_RECORD,
} from '../types/types'

export const getStudentRecordPending = () => ({ type: `${GET_STUDENT_RECORD}_PENDING` })
export const getStudentRecordFulfilled = payload => ({
  type: `${GET_STUDENT_RECORD}_FULFILLED`,
  payload,
})
export const getStudentRecordRejected = err => ({
  type: `${GET_STUDENT_RECORD}_REJECTED`,
  payload: err.message,
})

export const getStudentRecord = username => async (dispatch) => {
  dispatch(getStudentRecordPending())
  try {
    const response = await axios.get(`${process.env.STUDENT_RECORD_URL}/student/${username}`)
    dispatch(getStudentRecordFulfilled(response.data))
  } catch (err) {
    dispatch(getStudentRecordRejected(err))
  }
}