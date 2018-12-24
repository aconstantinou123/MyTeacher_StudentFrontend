import store from '../store/store'
import {
  PARTICIPANT_ADDED,
  PARTICIPANT_LEFT,
} from '../types/types'


export const attachTracks = (tracks, studentContainer) => {
  tracks.forEach((track) => {
    studentContainer.appendChild(track.attach())
  })
}

export const attachParticipantTracks = (participant, studentContainer) => {
  const tracks = Array.from(participant.tracks.values())
  attachTracks(tracks, studentContainer)
}

export const detachTracks = (tracks) => {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove()
    })
  })
}

export const detachParticipantTracks = (participant) => {
  const tracks = Array.from(participant.tracks.values())
  detachTracks(tracks)
}

export const roomJoined = (room, studentContainer, teacherContainer) => {
  attachParticipantTracks(room.localParticipant, studentContainer)
  console.log(room.participants)
  room.participants.forEach((participant) => {
    console.log(`Already in Room: '${participant.identity}'`)
    if (participant.identity.includes('TEACHER')) {
      attachParticipantTracks(participant, teacherContainer)
    } else {
      attachParticipantTracks(participant, studentContainer)
      console.log('herer')
      store.dispatch({ type: PARTICIPANT_ADDED })
    }
  })
  room.on('participantConnected', (participant) => {
    console.log(`A remote Participant connected: ${participant.identity}`)
    store.dispatch({ type: PARTICIPANT_ADDED })
  })
  room.on('trackSubscribed', (track, participant) => {
    console.log(`${participant.identity} added track: ${track.kind}`)
    if (participant.identity.includes('TEACHER')) {
      attachTracks([track], teacherContainer)
    } else {
      attachTracks([track], studentContainer)
    }
  })

  room.on('trackUnsubscribed', (track, participant) => {
    console.log(`${participant.identity} removed track: ${track.kind}`)
    detachTracks([track])
  })
  room.on('participantDisconnected', (participant) => {
    console.log(`Participant '${participant.identity}' left the room`)
    detachParticipantTracks(participant)
    if (!participant.identity.includes('TEACHER')) {
      store.dispatch({ type: PARTICIPANT_LEFT })
    }
  })

  room.on('disconnected', () => {
    console.log('disconnect')
    detachParticipantTracks(room.localParticipant)
    room.localParticipant.tracks.forEach(track => track.stop())
    room.participants.forEach(detachParticipantTracks)
  })
}
