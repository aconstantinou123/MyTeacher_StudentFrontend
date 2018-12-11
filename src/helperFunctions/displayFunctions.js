export const displayClassLevel = (slot) => {
  switch (slot.classLevel) {
    case 'ADVANCED':
      return 'Advanced'
    case 'UPPER_INT':
      return 'Upper-Intermediate'
    case 'INT':
      return 'Intermediate'
    case 'PRE_INT':
      return 'Pre-Intermediate'
    case 'ELEMENTARY':
      return 'Elementary'
    case 'BEGINNER':
      return 'Beginner'
    case 'NONE_SPECIFIED':
      return 'None specified'
    default:
      return ''
  }
}

export const displayClassType = (slot) => {
  switch (slot.classType) {
    case 'OPEN_SLOT':
      return 'Open slot'
    case 'ONE_ON_ONE':
      return 'One on One'
    case 'GROUP':
      return 'Group'
    default:
      return ''
  }
}

export const displayClassCSS = (slot) => {
  switch (slot.classType) {
    case 'OPEN_SLOT':
      return 'card-container open'
    case 'ONE_ON_ONE':
      return 'card-container one'
    case 'GROUP':
      return 'card-container group'
    default:
      return 'card-container'
  }
}
