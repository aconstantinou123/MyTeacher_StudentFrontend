import axios from 'axios'
import _ from 'lodash'

import {
  GET_AVAILABLE_CLASSES,
} from '../types/types'

export const getAvailableClassesPending = () => ({ type: `${GET_AVAILABLE_CLASSES}_PENDING` })
export const getAvailableClassesFulfilled = payload => ({
  type: `${GET_AVAILABLE_CLASSES}_FULFILLED`,
  payload,
})
export const getAvailableClassesRejected = err => ({
  type: `${GET_AVAILABLE_CLASSES}_REJECTED`,
  payload: err.message,
})

export const getAvailableClasses = classLevel => async (dispatch) => {
  dispatch(getAvailableClassesPending())
  try {
    const response = await axios.get(`${process.env.SCHEDULE_URL}/slots/${classLevel}`)
    const duplicateClassedRemoved = _.uniqBy(response.data, slot => slot.classId)
    dispatch(getAvailableClassesFulfilled(duplicateClassedRemoved))
  } catch (err) {
    dispatch(getAvailableClassesRejected(err))
  }
}
