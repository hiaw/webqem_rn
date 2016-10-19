import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements'

import styles from './Styles/MainScreen.Style.js'

export default class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      type:'uint8',
      numOfRandomNum: 10
    }
    this.changeNumberType = this.changeNumberType.bind(this)
    this.getMoreRandomNumber = this.getMoreRandomNumber.bind(this)
    this.changeNumberOfRandomNumber = this.changeNumberOfRandomNumber.bind(this)
  }

  getMoreRandomNumber() {

  }

  changeNumberType() {
    if (this.state.type == 'uint8') {
      this.setState({ type: 'uint16'})
    } else {
      this.setState({ type: 'uint8'})
    }
  }

  changeNumberOfRandomNumber(value) {
    this.setState({numOfRandomNum: value})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textRow}>
            <FormInput
              placeholder='Num of Random Numbers'
              keyboardType='numeric'
              value={this.state.numOfRandomNum.toString()}
              onChangeText={this.changeNumberOfRandomNumber}/>
          </View>
          <View style={styles.fullRow}>
            <Button
              small
              onPress={this.changeNumberType}
              title={this.state.type} />
          </View>
        </View>
        <Button
          small
          onPress={this.getMoreRandomNumber}
          title='Request' />
      </View>
    );
  }
}
