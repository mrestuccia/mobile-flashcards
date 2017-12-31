import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { white, orange } from '../utils/colors';

export function SubmitBtn({ text, onPress }) {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>{text || 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});
