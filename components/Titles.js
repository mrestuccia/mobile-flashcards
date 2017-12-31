import React from 'react';
import { StyleSheet, Text } from 'react-native';

export function Title({ text }) {
  return (<Text style={styles.title}>{text}</Text>);
}

export function SubTitle({ text }) {
  return (<Text style={styles.subTitle}>{text}</Text>);
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 25,
    alignItems: 'center'
  },
  subTitle: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    alignItems: 'center'
  },
});
