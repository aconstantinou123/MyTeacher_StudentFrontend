import React from 'react'
import PropTypes from 'prop-types'

import './WebSocketBoardStudent.scss'

const WebSocketBoardStudent = ({ dataReceived }) => (
  <div className="board">
    <p className="board-paragraph">
      {dataReceived}
    </p>
  </div>
)
WebSocketBoardStudent.defaultProps = {
  dataReceived: '',
}

WebSocketBoardStudent.propTypes = {
  dataReceived: PropTypes.string,
}

export default WebSocketBoardStudent
