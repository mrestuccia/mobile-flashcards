import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { gray, white, black } from '../utils/colors';
import { Title } from './Titles';
import { SubmitBtn } from './SubmitBtn';
import { TextBox } from './TextBox';

import { addCardToDeck } from '../utils/api';
import { receiveDecks } from '../actions';



class CardNew extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `Add Card`
    }
  }


  submit = () => {
    const entry = this.state;

    // Ignore submits until this is complete
    if (entry.question === '' || entry.answer ==='') return null;

    const { deckId } = this.props.navigation.state.params;
    const { dispatch } = this.props;

    // Reset the state
    this.setState(() => ({ question: '', answer: '' }));

    // Move back
    this.props.navigation.dispatch(NavigationActions.back({ deckId }))

    // Save the localStorage and Redux
    addCardToDeck(deckId['deckId'], entry).then(decks => {
      dispatch(receiveDecks(decks));
    });

  }


  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <Title text='Add Card' />
        <TextBox
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder='Enter question'
        />
        <TextBox
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Enter answer'
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
    backgroundColor: white
  },
})

export default connect()(CardNew);
