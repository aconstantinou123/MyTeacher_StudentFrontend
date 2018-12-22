import { 
  MESSAGE_RECEIVED,
  VOCAB_MESSAGE,
  GRAMMAR_MESSAGE,
  AIMS_MESSAGE,
  MISC_MESSAGE
 } from '../types/types'

const defaultState = {
  dataReceived: '',
  vocabBoardContent: '',
  grammarBoardContent: '',
  aimsBoardContent: '',
  miscBoardContent: '',
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        dataReceived: action.payload,
      }
    case VOCAB_MESSAGE:
      return {
        ...state,
        vocabBoardContent: action.payload,
      }
    case GRAMMAR_MESSAGE:
      return {
        ...state,
        grammarBoardContent: action.payload,
      }
    case AIMS_MESSAGE:
      return {
        ...state,
        aimsBoardContent: action.payload,
      }
    case MISC_MESSAGE:
      return {
        ...state,
        miscBoardContent: action.payload,
      }
    default:
      return state
  }
}
