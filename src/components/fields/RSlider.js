
import React from "react";
// import Slider from 'react-native-range-slider'
import {StyleSheet, Text, View, Image} from 'react-native';
import RangeSlider from 'react-native-range-slider'

export default class RSlider extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>Simple example(Normal slider):</Text>
          <RangeSlider
            disableRange={true}
            lineHeight={2}
            handleDiameter={18}
            minValue={0}
            maxValue={100}
            selectedMaximum={50}
            style={{ flex: 1, height: 70, marginTop: 20, padding: 10 }}
            onChange={(data) => {}}
          />
        </View>
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <Text style={styles.title}>Standard range:</Text>
          <RangeSlider
            lineHeight={2}
            handleDiameter={18}
            minValue={0}
            maxValue={100}
            selectedMinimum={20}
            selectedMaximum={60}
            style={{ flex: 1, height: 70, marginTop: 20, padding: 10 }}
            onChange={(data) => {}}
          />
        </View>
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <Text style={styles.title}>Currency range:</Text>
          <RangeSlider
            lineHeight={2}
            handleDiameter={18}
            preffix="$"
            tintColor="#cc3956"
            tintColorBetweenHandles="#cc3956"
            minValue={0}
            maxValue={100}
            selectedMinimum={30}
            selectedMaximum={70}
            style={{ flex: 1, height: 70, marginTop: 20, padding: 10 }}
            onChange={(data) => {}}
          />
        </View>
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <Text style={styles.title}>Custom range:</Text>
          <RangeSlider
            lineHeight={3}
            handleDiameter={20}
            suffix="B"
            tintColor="#4635aa"
            handleColor="#7fae09"
            tintColorBetweenHandles="##21c625"
            minLabelColour="#828282"
            maxLabelColour="#6edefb"
            minValue={0}
            maxValue={100}
            selectedMinimum={30}
            selectedMaximum={70}
            style={{ flex: 1, height: 70, marginTop: 20, padding: 10 }}
            onChange={(data) => {}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  img: {
    height: 70,
    width: 70,
  },
  title: {
    fontWeight: 'bold',
    padding: 10,
  }
});