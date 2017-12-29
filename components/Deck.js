import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { gray, white, black } from '../utils/colors';
import { getDeck } from '../utils/api';

class Deck extends Component {
  state = {
    deck: {}
  }

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

  render() {
    const { deck } = this.state;

    if (!deck.questions) return null;

    let size = Object.keys(deck.questions).length;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Deck Detail</Text>
        <Text style={styles.subTitle}>{size} cards</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.addCard}
            style={styles.grayButton}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ev => (null)}
            style={styles.blackButton}>
            <Text style={{ color: white }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 'auto',
    justifyContent: 'center',
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
  grayButton: {
    backgroundColor: gray,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  blackButton: {
    backgroundColor: black,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
})

export default Deck;
