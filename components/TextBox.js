import React from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';


export function TextBox({ value, onChangeText, placeholder }) {
  return (
    <KeyboardAvoidingView behavior="padding">
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderColor: '#c9c9c9',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    margin: 15,
    padding: 20,
    borderRadius: 4,
  }
});
