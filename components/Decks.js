import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { white, gray } from '../utils/colors';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/';

import { Title } from './Titles';

class Decks extends Component {

  componentDidMount() {

    const { dispatch } = this.props;

    getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      });
  }
  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <Title text="Decks" />
        <ScrollView>
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
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
  },
});


function mapStateToProps(decks) {
  return {
    decks
  };
}


export default connect(mapStateToProps)(Decks);
