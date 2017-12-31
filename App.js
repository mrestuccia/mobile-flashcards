import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './store/'

// Expo
import { Constants } from 'expo';

// Helpers
import { magenta } from './utils/colors';
import { setLocalNotification } from './utils/helpers'

// Components
import { MainNavigator } from './components/Navigation';



function DeckStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}





export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <DeckStatusBar backgroundColor={magenta} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
