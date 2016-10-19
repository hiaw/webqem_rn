import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Button, FormLabel, FormInput} from 'react-native-elements'
import Chart from 'react-native-chart'
import randomColor from 'randomcolor'

import styles from './Styles/MainScreen.Style.js'

export default class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      type:'uint8',
      data: [],
      colors: [],
      numOfRandomNum: '5'
    }
    this.changeNumberType = this.changeNumberType.bind(this)
    this.getMoreRandomNumber = this.getMoreRandomNumber.bind(this)
    this.changeNumberOfRandomNumber = this.changeNumberOfRandomNumber.bind(this)
  }


 componentDidMount() {
    this.getMoreRandomNumber()
  }

  getMoreRandomNumber() {
    fetch(`https://qrng.anu.edu.au/API/jsonI.php?length=${this.state.numOfRandomNum}&type=${this.state.type}`)
      .then((response) => response.json())
      .then((responseJson) => {
        let newData = []
        let colors = []
        for (let i = 0; i < responseJson.data.length; i++) {
          newData.push([i, responseJson.data[i]])
          colors.push(randomColor().toString())
        }
        this.setState({data: newData, colors: colors})
      })
      .done()
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
              value={this.state.numOfRandomNum}
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
        <Chart
          style={styles.chart}
      color='#ddd'
          data={this.state.data}
          type="bar"
        />
      </View>
    );
  }
}
