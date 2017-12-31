import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

// Expo
import { FontAwesome } from '@expo/vector-icons';

// Helpers
import { white, darkGray, magenta } from '../utils/colors';


// Components
import Decks from './Decks';
import Deck from './Deck';
import DeckNew from './DeckNew';
import CardNew from './CardNew';
import Quiz from './Quiz';


export const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='list' size={30} color={tintColor} />
    },
  },
  DeckNew: {
    screen: DeckNew,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? magenta : darkGray,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? darkGray : magenta,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  });

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: magenta,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: magenta,
      }
    }
  },
  CardNew: {
    screen: CardNew,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: magenta,
      }
    }
  },
});
