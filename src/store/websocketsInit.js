// import { WEBSOCKET_TYPES, SOCKET_DISCONNECTED, SOCKET_CONNECTING } from '../types/types'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { MESSAGE_RECEIVED } from '../types/types'

let socket
let stompClient

const init = (store) => {
  socket = new SockJS('http://localhost:3005/ws')
  stompClient = Stomp.over(socket)
  const onConnected = () => {
    const { teacherId, username } = store.getState().student.student
    stompClient.subscribe(`/topic/public/${teacherId}`, (message) => {
      const parsedMessage = JSON.parse(message.body)
      store.dispatch({ type: MESSAGE_RECEIVED, payload: parsedMessage.content })
    })
    stompClient.send(`/app/chat.addUser/${teacherId}`,
      {},
      JSON.stringify({ sender: username, type: 'JOIN' }))
  }


  const onError = (error) => {
    console.log('disconnect', error.message)
    stompClient.connect({}, onConnected, onError)
  }
  stompClient.connect({}, onConnected, onError)
}

const emit = (message, username, teacherId) => {
  if (message && stompClient) {
    const chatMessage = {
      sender: username,
      content: message,
      type: 'CHAT',
    }
    stompClient.send(`/app/chat.sendMessage/${teacherId}`, {}, JSON.stringify(chatMessage))
  }
}


export { init, emit }
