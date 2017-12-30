import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { gray, white, black, purple } from '../utils/colors';
import { SubmitBtn } from './SubmitBtn';
import { saveDeck } from '../utils/api';
import { addDeck } from '../actions';

class DeckNew extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const title = this.state.title;

    let deck = {
      [title]: {
        title: title,
        questions: []
      }
    }

    // Redux
    this.props.dispatch(addDeck(deck));

    // Clean up
    this.setState(() => ({ title: '' }));

    // Navigate Back
    this.props.navigation.dispatch(NavigationActions.back())

    // Save in local storage
    saveDeck(deck);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title} />

        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

export default connect()(DeckNew)
