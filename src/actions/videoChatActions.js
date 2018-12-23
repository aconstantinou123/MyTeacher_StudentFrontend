import axios from 'axios'
import { connect, createLocalTracks } from 'twilio-video'
import randomstring from 'randomstring'
import { roomJoined } from '../helperFunctions/videoChatFunctions'

import {
  GENERATE_TOKEN,
  CONNECT_TO_ROOM,
  DISCONNECT_FROM_ROOM,
} from '../types/types'

const randomUsername = randomstring.generate(20)

export const generateTokenPending = () => ({ type: `${GENERATE_TOKEN}_PENDING` })
export const generateTokenFulfilled = payload => ({
  type: `${GENERATE_TOKEN}_FULFILLED`,
  payload,
})
export const generateTokenRejected = err => ({
  type: `${GENERATE_TOKEN}_REJECTED`,
  payload: err.message,
})

export const generateToken = () => async (dispatch) => {
  dispatch(generateTokenPending())
  try {
    const response = await axios.get(`${process.env.TWILIO_URL}?identity=${randomUsername}&room=classroom`)
    dispatch(generateTokenFulfilled(response.data))
  } catch (err) {
    dispatch(generateTokenRejected(err))
  }
}

export const connectToRoomPending = () => ({ type: `${CONNECT_TO_ROOM}_PENDING` })
export const connectToRoomFulfilled = payload => ({
  type: `${CONNECT_TO_ROOM}_FULFILLED`,
  payload,
})
export const connectToRoomRejected = err => ({
  type: `${CONNECT_TO_ROOM}_REJECTED`,
  payload: err.message,
})

export const connectToRoom = (studentContainer, teacherContainer) => async (dispatch, getState) => {
  dispatch(connectToRoomPending())
  const { videoToken } = getState().videoChat
  try {
    const localTracks = await createLocalTracks({
      audio: true,
      video: { width: 320 },
    })
    const room = await connect(videoToken, { name: 'example', tracks: localTracks })
    console.log(`Successfully joined a Room: ${room}`)
    roomJoined(room, studentContainer, teacherContainer)
    dispatch(connectToRoomFulfilled(room))
  } catch (err) {
    dispatch(connectToRoomRejected(err))
  }
}

export const disconnectFromRoom = currentRoom => ({
  type: DISCONNECT_FROM_ROOM,
  payload: currentRoom,
})
