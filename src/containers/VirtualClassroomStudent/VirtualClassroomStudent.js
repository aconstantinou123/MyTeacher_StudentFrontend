import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as videoChatActionCreators from '../../actions/videoChatActions'

import WebSocketBoardStudent from '../../components/WebSocketBoardStudent/WebSocketBoardStudent'
import './VirtualClassroomStudent.scss'

class VirtualClassroomStudent extends Component {
  constructor() {
    super()
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  componentDidMount(){
    const {
      student,
      generateToken,
    } = this.props
    if(student){
      generateToken(student.username)
    }
  }

  componentWillReceiveProps(nextProps){
    const {
      student,
      generateToken,
    } = this.props
    if (student !== nextProps.student && nextProps.student.username) {
      generateToken(nextProps.student.username)
    }
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
      <div className="classroom-container">
          <div ref={(teacherMedia) => { this.teacherMedia = teacherMedia }} className="teacher-container"/>
        <div className="board-container">
          <WebSocketBoardStudent dataReceived={vocabBoardContent} />
          <WebSocketBoardStudent dataReceived={grammarBoardContent} />
          <WebSocketBoardStudent dataReceived={aimsBoardContent} />
          <WebSocketBoardStudent dataReceived={miscBoardContent} />
        </div>
        <div className="student-container">
          < div ref={(studentMedia) => { this.studentMedia = studentMedia }} className="student-video"/>
        </div>
          {
            !hasJoinedRoom
            && <button type="button" onClick={() => connectToRoom(this.studentMedia, this.teacherMedia)}>Connect</button>
          }
          {
            hasJoinedRoom
            && <button type="button" onClick={this.handleDisconnect}>Disconnect</button>
          }
      </div>
    )
  }
}

VirtualClassroomStudent.defaultProps = {
  student: null,
  activeRoom: null,
  vocabBoardContent: null,
  grammarBoardContent: null,
  aimsBoardContent: null,
  miscBoardContent: null,
}

VirtualClassroomStudent.propTypes = {
  student: PropTypes.object,
  generateToken: PropTypes.func.isRequired,
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
    ...state.student,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...videoChatActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualClassroomStudent)
