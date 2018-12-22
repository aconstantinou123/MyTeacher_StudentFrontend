import React from 'react'
import PropTypes from 'prop-types'

import './WebSocketBoardStudent.scss'

const WebSocketBoardStudent = ({ dataReceived }) => (
  <div>
    <p className="vocab-board">
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
