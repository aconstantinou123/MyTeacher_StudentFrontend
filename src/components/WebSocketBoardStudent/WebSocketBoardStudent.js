import React from 'react'
import PropTypes from 'prop-types'

const  WebSocketBoardStudent = ({ dataReceived }) => {
    return (
      <div>
        <p>
        {dataReceived} 
        </p>
      </div>
    )
}

WebSocketBoardStudent.defaultProps = {
  dataReceived: ''
}

WebSocketBoardStudent.propTypes = {
  dataReceived: PropTypes.string
}

export default WebSocketBoardStudent