import React from 'react'
import PropTypes from 'prop-types'
import { displayClassLevel, displayClassType, displayClassCSS } from '../../helperFunctions/displayFunctions'

import './BookedClass.scss'

const BookedClass = ({ bookedClass }) => (
  <div
    className={displayClassCSS(bookedClass)}
  >
    <h2>
  Date:
      {bookedClass.date}
    </h2>
    <h3>
  Start time:
      {bookedClass.startTime}
    </h3>
    <h3>
  End time:
      {bookedClass.endTime}
    </h3>
    <h3>
  Class type:
      {displayClassType(bookedClass)}
    </h3>
    <h3>
  Class level:
      {displayClassLevel(bookedClass)}
    </h3>
    <h3>
  Class capacity:
      {bookedClass.capacity}
    </h3>
    <h4>
  Class description:
      {bookedClass.classDescription}
    </h4>
  </div>
)
BookedClass.propTypes = {
  bookedClass: PropTypes.object.isRequired,
}

export default BookedClass
