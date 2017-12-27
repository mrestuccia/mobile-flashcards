import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { white, gray } from '../utils/colors'
import { getDecks } from '../utils/api';

class Decks extends Component {
  state = {
    decks: {},
  }
  componentDidMount() {
    getDecks()
      .then(decks => {
        this.setState({ decks })
      })
  }
  render() {
    const { decks } = this.state;
    return (
      <View>
        {
          Object.keys(decks).map(deck => (
            <View key={deck} style={styles.item}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                { deckId: deck }
              )}>
                <Text style={{ fontSize: 20 }}>{deck}</Text>
                <Text style={{ fontSize: 16, color: gray }}>{decks[deck].questions.length} cards</Text>
              </TouchableOpacity>
            </View>

          ))
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})



export default Decks;
