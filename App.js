import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gray } from './utils/colors';
import { Constants } from 'expo';



function StatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={gray} barStyle="light-content" />
        <Text>Cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
