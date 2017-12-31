import { RECEIVE_DECKS, ADD_DECK } from '../actions/types'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      let temp = {
        ...state,
        ...action.decks
      }
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    default:
      return state
  }
}

export default decks;
