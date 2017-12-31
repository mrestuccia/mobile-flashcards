import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';
import FlipCard from 'react-native-flip-card'

import { white, gray } from '../utils/colors';
import { SubmitBtn } from './SubmitBtn';
import { Title, SubTitle } from './Titles';

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

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: `Quiz`
    }
  }

  render() {
    const { deck, total, keys } = this.props;
    const { correct, incorrect, current } = this.state;
    const result = (total > 0) ? Math.round((correct / total) * 100) : 0;
    const card = deck.questions[current];

    if (current === total) {
      return (
        <View style={styles.container}>
          <Title text={`Your result is ${result}%`} />
          <SubTitle text={`Correct: ${correct}`} />
          <SubTitle text={`Incorrect: ${incorrect}`} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Title text='Quiz' />
        <SubTitle text={`${current + 1} of ${total}`} />

        <View style={styles.container}>
          <FlipCard alignHeight={true}>
            <View>
              <SubTitle text={`[Q]:${card.question}`} />
            </View>
            <View>
              <SubTitle text={`[A]:${card.answer}`} />
            </View>
          </FlipCard>
        </View>
        <View style={styles.container}>
        <SubmitBtn text='Correct' onPress={() => this.response('correct')} />
        <SubmitBtn text='Incorrect' onPress={() => this.response('incorrect')} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    borderColor:white,
  },
});

function mapStateToProps(state, props) {
  const { deckId } = props.navigation.state.params;
  console.log(deckId)
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
