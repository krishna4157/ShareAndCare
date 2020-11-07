import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {CustomSlider} from './app/layout/slider/CustomSlider';

export default class PainScale extends Component{

  constructor(props) {
    super(props);
    this.state = { 
      singleSliderValues: [],
      multiSliderValues: [],
    }
  }

  changeSliderValue = (values) => {
    const { onValueChange } = this.props;
    onValueChange(values)
  }

  render() {
    const { value, fieldType, t } = this.props;
    return (
      <View style={styles.container}>
        <CustomSlider
          min={0}
          max={10}
          LRpadding={40}
          callback={this.changeSliderValue}
          single
          value={value}
          fieldType={fieldType}
          t={t}
        />
        </View>
    );
  }

  singleSliderValueCallback =(values)=> {
    // alert(values);
    this.setState({singleSliderValues : values})
  }

  multiSliderValueCallback = (values) => {
    this.setState({multiSliderValues : values})
  }
}

const styles = StyleSheet.create({
  container: {
    // top:100,
    flex: 1
  },
  title:{
    padding:20,
    fontSize:18,
  },
  column:{
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
},
  label: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    // borderRadius: 10
  },

});
