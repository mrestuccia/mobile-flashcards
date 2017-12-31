import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { gray, white, black } from '../utils/colors';
import { Title, SubTitle } from './Titles'
import { SubmitBtn } from './SubmitBtn';
import { TextBox } from './TextBox';
import { saveDeck } from '../utils/api';
import { addDeck } from '../actions';

class DeckNew extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const title = this.state.title;

    // Check that is not empty
    if (title === '') return null;

    // Create a deck object
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
    this.props.navigation.dispatch(NavigationActions.back());

    // Save in local storage
    saveDeck(deck);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <Title text='Deck New' />
        <SubTitle text='What is the title of your new deck?' />
        <TextBox
          onChangeText={(title) => this.setState({ title })}
          placeholder='Enter title'
          value={this.state.title}
        />

        <SubmitBtn onPress={this.submit} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderColor: '#c9c9c9',
    borderWidth: 1,
    margin: 15,
    padding: 20,
    borderRadius: 4,
  }
});


export default connect()(DeckNew)
