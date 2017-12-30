import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import FlipCard from 'react-native-flip-card'

import { white, gray } from '../utils/colors';
import { SubmitBtn } from './SubmitBtn';

class Quiz extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    current: 0
  }

  response = (key) => {
    this.setState({ [key]: this.state[key] + 1 });
    this.setState({ current: this.state.current + 1 });
  }


  render() {
    const { deck, total, keys } = this.props;
    const { correct, incorrect, current } = this.state;
    const result = (total > 0) ? Math.round((correct / total) * 100) : 0;
    const card = deck.questions[current];

    if (current === total) {
      return (
        <View style={styles.container}>
          <Text>Your result is {result}%</Text>
          <Text>Correct: {correct}</Text>
          <Text>Incorrect: {incorrect}</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Quiz</Text>
        <Text>{current + 1} of {total}</Text>

        <FlipCard style={styles.card}>
          <View style={styles.face}>
            <Text>[question]: {card.question} </Text>
          </View>
          <View style={styles.back}>
            <Text>[answer]:{card.answer}</Text>
          </View>
        </FlipCard>

        <SubmitBtn text='correct' onPress={() => this.response('correct')} />

        <SubmitBtn text='incorrect' onPress={() => this.response('incorrect')} />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  card: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
});

function mapStateToProps(state, props) {
  const { deckId } = props.navigation.state.params;
  const deck = state[deckId.deckId]; //TODO correct this.
  const keys = Object.keys(deck.questions)
  const total = keys.reduce((prev, curr) => prev + 1, 0);

  return {
    deck: deck,
    total: total,
    keys: keys
  }
}

export default connect(mapStateToProps)(Quiz);
