import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements'

import styles from './Styles/MainScreen.Style.js'

export default class MainScreen extends Component {
  getMoreRandomNumber() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textRow}>
            <FormInput
              placeholder='Num of Random Numbers'
              onChangeText={this.changeNumberOfRandomNumber}/>
          </View>
          <View style={styles.fullRow}>
            <Button
              small
              onPress={this.changeNumberType}
              title='uint8' />
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
