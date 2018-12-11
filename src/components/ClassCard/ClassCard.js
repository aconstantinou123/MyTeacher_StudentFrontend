import React from 'react'
import PropTypes from 'prop-types'
import { displayClassLevel, displayClassType, displayClassCSS } from '../../helperFunctions/displayFunctions'

import './ClassCard.scss'

const ClassCard = ({ availableClass }) => {
  return (
  <div className={displayClassCSS(availableClass)}>
    <h2>Date: {availableClass.date}</h2>
    <h3>Start time: {availableClass.startTime}</h3>
    <h3>End time: {availableClass.endTime}</h3>
    <h3>Class type: {displayClassType(availableClass)}</h3>
    <h3>Class level: {displayClassLevel(availableClass)}</h3>
    <h3>Class capacity: {availableClass.capacity}</h3>
    <h4>Class description: {availableClass.classDescription}</h4>
  </div>
  )
}

ClassCard.propTypes = {
  availableClass: PropTypes.object.isRequired,
}

export default ClassCard