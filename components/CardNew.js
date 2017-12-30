import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { gray, white, black, purple } from '../utils/colors';

import { SubmitBtn } from './SubmitBtn';

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
    const { deckId } = this.props.navigation.state.params;
    const { dispatch } = this.props;


    this.setState(() => ({ question: '', answer: '' }));

    this.props.navigation.dispatch(NavigationActions.back({ deckId }))

    addCardToDeck(deckId['deckId'], entry).then(decks => {
      dispatch(receiveDecks(decks));
    });

  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Card New</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder='Enter question'
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Enter answer'
        />

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
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default connect()(CardNew);
