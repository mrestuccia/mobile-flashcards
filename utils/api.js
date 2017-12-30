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

export function saveDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
}

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
