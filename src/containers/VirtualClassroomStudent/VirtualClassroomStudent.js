import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'

import './VirtualClassroomStudent.scss'
import WebSocketBoardStudent from '../../components/WebSocketBoardStudent/WebSocketBoardStudent'

class VirtualClassroomStudent extends Component {
  constructor() {
    super()
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    const { activeRoom, disconnectFromRoom } = this.props
    activeRoom.disconnect()
    disconnectFromRoom(activeRoom)
  }


  render() {
    const {
      connectToRoom,
      hasJoinedRoom,
      vocabBoardContent,
      grammarBoardContent,
      miscBoardContent,
      aimsBoardContent,
    } = this.props
    return (
      <div className="test">
Video Chat Test
        <div ref={(remoteMedia) => { this.remoteMedia = remoteMedia }} className="media-container" />
        <div ref={(localMedia) => { this.localMedia = localMedia }} className="media-container" />
        {
          !hasJoinedRoom
          && <button type="button" onClick={() => connectToRoom(this.localMedia, this.remoteMedia)}>Connect</button>
        }
        {
          hasJoinedRoom
          && <button type="button" onClick={this.handleDisconnect}>Disconnect</button>
        }
        <WebSocketBoardStudent dataReceived={vocabBoardContent} />
        <WebSocketBoardStudent dataReceived={grammarBoardContent} />
        <WebSocketBoardStudent dataReceived={aimsBoardContent} />
        <WebSocketBoardStudent dataReceived={miscBoardContent} />
      </div>
    )
  }
}

VirtualClassroomStudent.defaultProps = {
  activeRoom: null,
  vocabBoardContent: null,
  grammarBoardContent: null,
  aimsBoardContent: null,
  miscBoardContent: null,
}

VirtualClassroomStudent.propTypes = {
  vocabBoardContent: PropTypes.string,
  grammarBoardContent: PropTypes.string,
  aimsBoardContent: PropTypes.string,
  miscBoardContent: PropTypes.string,
  activeRoom: PropTypes.object,
  disconnectFromRoom: PropTypes.func.isRequired,
  connectToRoom: PropTypes.func.isRequired,
  hasJoinedRoom: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.videoChat,
    ...state.webSocket,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualClassroomStudent)
