import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Expo
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Helpers
import { orange, white, black, darkGray, magenta } from './utils/colors';
import { setLocalNotification } from './utils/helpers'

// Redux
import reducer from './reducers/';

// Components
import Decks from './components/Decks';
import Deck from './components/Deck';
import DeckNew from './components/DeckNew';
import CardNew from './components/CardNew';
import Quiz from './components/Quiz';




function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator({
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



const MainNavigator = StackNavigator({
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
})



export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <DeckStatusBar backgroundColor={magenta} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
