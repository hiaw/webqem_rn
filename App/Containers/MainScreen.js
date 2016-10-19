import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import { Button, ListItem, FormLabel, FormInput} from 'react-native-elements'
import Chart from 'react-native-chart'

import styles from './Styles/MainScreen.Style.js'

export default class MainScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      type:'uint8',
      data: [],
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
        for (let i = 0; i < responseJson.data.length; i++) {
          newData.push([i+1, responseJson.data[i]])
        }
        this.setState({data: newData})
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

  renderValueList(value) {
    return <ListItem key={value[0]} title={`#${value[0]}: ${value[1]}`}/>
  }

  render() {
    let valueTable = this.state.data.map(this.renderValueList)
    return (
      <ScrollView style={styles.container}>
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
          data={this.state.data}
          type="bar"
        />
      {valueTable}
      </ScrollView>
    );
  }
}
