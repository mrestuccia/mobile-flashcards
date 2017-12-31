import { AsyncStorage } from 'react-native';
import { formatDeckResults, DECKS_STORAGE_KEY } from './decks';

// Get all the Decks from LocalStorage
// If does not exist, seed from the _data file.
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => {
      return formatDeckResults(res);
    });
}

// Get an specific Deck Object from LocalStorage
export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(res => (res[id]));
}

// Append the new deck on the LocalStorage
export function saveDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}

// Append a question/answer Object to an specific deck Object
// in Local Storage
export function addCardToDeck(deckTitle, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(res => {
      let questions = res[deckTitle].questions;
      questions = [...questions, card];
      return questions;
    })
    .then(questions => {
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
          title: deckTitle,
          questions
        },
      }));
    })
    .then(res => {
      return getDecks();
    });
}
