import axios from 'axios'
import jwt from 'jsonwebtoken'
import { getStudent } from './studentActions'

import {
  STUDENT_LOGIN,
  PERSIST_LOGIN,
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

export const persistLoginPending = () => ({ type: `${PERSIST_LOGIN}_PENDING` })
export const persistLoginFulfilled = payload => ({
  type: `${PERSIST_LOGIN}_FULFILLD`,
  payload,
})
export const persistLoginRejected = err => ({
  type: `${PERSIST_LOGIN}_REJECTED`,
  payload: err.message,
})

export const persistLogin = () => async (dispatch) => {
  dispatch(persistLoginPending())
  try {
    const response = await axios.get(`${process.env.STUDENT_URL}/persist-login`)
    axios.defaults.headers.common.Authorization = response.headers.authorization
    const token = response.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(decoded)
      dispatch(getStudent(decoded.sub))
    })
    dispatch(persistLoginFulfilled(response.data))
  } catch (err) {
    dispatch(persistLoginRejected(err))
  }
}
