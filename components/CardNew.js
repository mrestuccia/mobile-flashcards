import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { gray, white, black, purple } from '../utils/colors';
import { addCardToDeck } from '../utils/api';


function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}


class CardNew extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `Add Card`
    }
  }


  submit = () => {
    const key = 'React';
    const entry = this.state;

    this.setState(() => ({ question: '', answer: '' }));
    

    addCardToDeck(key, entry);

    this.props.navigation.dispatch(NavigationActions.back({ key: 'Decks' }))


  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Card New</Text>
        <TextInput  
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
          onChangeText={(question) => this.setState({question})}
          value={this.state.question} />
          <TextInput  
          style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer} />

        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
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
})

export default CardNew;
