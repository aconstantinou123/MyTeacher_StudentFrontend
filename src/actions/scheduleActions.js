import axios from 'axios'
import _ from 'lodash'

import {
  GET_STUDENT_SCHEDULE,
} from '../types/types'

export const getStudentSchedulePending = () => ({ type: `${GET_STUDENT_SCHEDULE}_PENDING` })
export const getStudentScheduleFulfilled = payload => ({
  type: `${GET_STUDENT_SCHEDULE}_FULFILLED`,
  payload,
})
export const getStudentScheduleRejected = err => ({
  type: `${GET_STUDENT_SCHEDULE}_REJECTED`,
  payload: err.message,
})

export const getStudentSchedule = classLevel => async (dispatch) => {
  dispatch(getStudentSchedulePending())
  try {
    const response = await axios.get(`${process.env.SCHEDULE_URL}/slots/${classLevel}`)
    const duplicateClassedRemoved = _.uniqBy(response.data, (slot) => slot.classId)
    dispatch(getStudentScheduleFulfilled(duplicateClassedRemoved))
  } catch (err) {
    dispatch(getStudentScheduleRejected(err))
  }
}
