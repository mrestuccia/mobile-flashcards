import { AsyncStorage } from 'react-native';
import data from './_data';

export const DECKS_STORAGE_KEY = 'mobileflashcards:decks';

function setSeedData(){
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function formatDeckResults (results) {
  return results === null
    ? setSeedData()
    : JSON.parse(results);
}