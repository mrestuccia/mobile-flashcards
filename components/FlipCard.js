import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SubTitle } from './Titles';


export function FlipCard({ question, answer, flip, onPress }) {
  if (flip) {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <SubTitle text={`[Q]:${question}`} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <SubTitle text={`[A]:${answer}`} />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderColor: '#c9c9c9',
    borderWidth: 1,
    margin: 15,
    padding: 20,
    borderRadius: 4,
  }
});
