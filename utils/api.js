import { AsyncStorage } from 'react-native';
import { formatDeckResults, DECKS_STORAGE_KEY } from './decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults);
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(res => (res[id]));
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }));
}

export function addCardToDeck(deckTitle, card) {

  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
    .then(res => {
      console.log('addCardToDeck-->', res);
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
    });
}
