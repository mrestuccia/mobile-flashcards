import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { gray, white, black } from '../utils/colors';
import { SubmitBtn } from './SubmitBtn';
import { getDeck } from '../utils/api';

class Deck extends Component {

  componentDidMount() {
    const { deckId } = this.props.navigation.state.params;

    getDeck(deckId)
      .then(deck => {
        this.setState({ deck: deck });
      })
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `${deckId}`
    }
  }


  addCard = () => {
    this.props.navigation.navigate(
      'CardNew',
      { deckId: this.props.navigation.state.params }
    )
  }

  startQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.navigation.state.params }
    )
  }

  render() {
    const { deck } = this.props;

    if (!deck.questions) return null;

    let size = Object.keys(deck.questions).length;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Deck Detail</Text>
        <Text style={styles.subTitle}>{size} cards</Text>
        <SubmitBtn text='Add Card' onPress={this.addCard} />
        <SubmitBtn text='Start Quiz' onPress={this.startQuiz} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    alignItems: 'center',
    padding: 20
  },
  subTitle: {
    fontSize: 16,
    color: gray,
    alignItems: 'center',
    padding: 20
  },
})

function mapStateToProps(state, props) {
  const { deckId } = props.navigation.state.params;
  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Deck);
