import React from 'react'
import PropTypes from 'prop-types'
import { displayClassLevel, displayClassType, displayClassCSS } from '../../helperFunctions/displayFunctions'

import './ClassCard.scss'

const ClassCard = ({ availableClass, selectClassToBook, history }) => {
  const handleSelectClassClicked = () => {
    selectClassToBook(availableClass)
    history.push('/schedule/confirm')
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || 32) {
      handleSelectClassClicked()
    }
  }
  return (
    <div
      tabIndex="0"
      role="button"
      onKeyDown={handleKeyDown}
      className={displayClassCSS(availableClass)}
      onClick={handleSelectClassClicked}
    >
      <h2>
  Date:
        {availableClass.date}
      </h2>
      <h3>
  Start time:
        {availableClass.startTime}
      </h3>
      <h3>
  End time:
        {availableClass.endTime}
      </h3>
      <h3>
  Class type:
        {displayClassType(availableClass)}
      </h3>
      <h3>
  Class level:
        {displayClassLevel(availableClass)}
      </h3>
      <h3>
  Class capacity:
        {availableClass.capacity}
      </h3>
      <h4>
  Class description:
        {availableClass.classDescription}
      </h4>
    </div>
  )
}
ClassCard.propTypes = {
  selectClassToBook: PropTypes.func.isRequired,
  availableClass: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default ClassCard
