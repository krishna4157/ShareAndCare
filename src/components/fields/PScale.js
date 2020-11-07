'use strict';

import React from "react";
import Slider from "../Slider/react-native-slider/src/Slider";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Slider as RNSlider
} from "react-native"

const DEFAULT_VALUE = 0.2;

class SliderContainer extends React.Component{
  state = {
    labels: [
      1,2,3,4,5
    ]
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      labels: [
        'No Pain',
        'Mild Pain',
        'Moderate Pain',
        'Severe Pain',
        'Worst Possible Pain',
    ],
    }));
  }
  
  buildLabelStylesForPainScale = (label) => {
    return StyleSheet.create({
      rotateLabel: {
        // height: 125,
          transform: [
                { rotateZ : '90deg' },
          ],
          // padding: 20,
          backgroundColor: '#64b5f6',
          borderRadius: 5,
          // alignSelf: 'stretch',
          paddingHorizontal: 3
      }
    }).rotateLabel;
  }

  _renderChildren = () => {
    return React.Children.map(this.props.children, (child) => {
        const { value } = child.props;
    //   if (child.type === Slider
    //       || child.type === RNSlider) {
    //     const value = this.state.value;
        // return React.cloneElement(child, {
        //   value: value,
        //   onValueChange: (val) => this.setState({value: val}),
        // });
        return child;
    //   } else {
    //     return child;
    //   }
    });
  }

  render() {
    const { caption } = this.props;
    const { props: childProps } = this.props.children;
    const { value } = childProps;
    const labels = [
        'No Pain',
        'Mild Pain',
        'Moderate Pain',
        'Severe Pain',
        'Worst Possible Pain',
    ];
    return (
      <View
    //   style={{ marginTop: 200, marginBottom: 200, marginHorizontal:-35, padding: 20,
    //   // backgroundColor: '#2b884c',
    //   transform: [
    //     { rotate : '-90deg'},
    //     {translateX: 140 },
    //     {scale: 1}
    //   ],
    // }}
    >
    {this._renderChildren()}
        <View style={styles.labelContainer}>
        {this.state.labels.map(label => ( <View
        style={this.buildLabelStylesForPainScale(label)}
        >
          <Text style={styles.caption}>{label}</Text>
        </View>))}
          {/* <Text style={styles.caption}>label 1</Text>
          <Text style={styles.value}>label 2</Text>
          <Text style={styles.value}>label 3</Text> */}
          {/* <Text style={styles.value}>label 4</Text> */}
        </View>
        {/* <View style={styles.labelContainer}>
        <View style={styles.VlabelContainer}>
            <Text style={styles.caption}>label 1</Text>
          <Text style={styles.value}>label 2</Text>
          <Text style={styles.value}>label 3</Text>
          <Text style={styles.value}>label 4</Text>
          <Text style={styles.value}>label 5</Text>
        </View>
        <View style={styles.scaleContainer}>
        {this._renderChildren()}
        </View>
        </View> */}
        
      </View>
    );
  }
};

export default class SliderExample extends React.Component{
  state = {
    value: 7.5,
  }

  render() {
      const { value } = this.state;
    return (
      <View
      style={{ marginTop: 200, marginBottom: 200, marginHorizontal:-35, padding: 20,
      // backgroundColor: '#2b884c',
      transform: [
        { rotate : '-90deg'},
        {translateX: 140 },
        {scale: 1}
      ],
    }}
    >
        <SliderContainer>
        <Slider
        value={value}
        orientation="vertical"
        inverted
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor='#64b5f6'
        maximumTrackTintColor='#d3d3d3'
        thumbTintColor='#5c8bc0'
        step={2.5}
        onValueChange={value => this.setState({ value })}
        trackStyle={customStyles5.track}
        thumbStyle={customStyles5.thumb}
        // thumbStyle={{
        // backgroundColor: 'white',
        // // borderColor: colors.purple1,
        // borderWidth: 3
        // }}
        // maximumTrackTintColor={}
          

        />
        </SliderContainer>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // margin: 20,
    paddingBottom: 20,
    marginLeft: 30,
    justifyContent: 'flex-start',
    // alignItems: 'stretch',
  },
  labelContainer: {
    paddingVertical: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // alignContent: 'flex-start',
    // alignSelf: 'flex-start',
    backgroundColor: '#d5d8e8',
  },
  VlabelContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scaleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  caption: {
    //flex: 1,
  },
  value: {
    // flex: 1,
    // textAlign: 'right',
    // marginLeft: 10,
  },
  rotateLabel: {
    // height: 125,
      transform: [
            { rotateZ : '90deg' },
      ],
      // padding: 20,
      // backgroundColor: '#93be47',
      borderRadius: 5,
      alignSelf: 'flex-start',
  }
});

const customStyles5 = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d5d8e8',
    // width: Dimensions.get('window').width - 20,
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#5c8bc0',
  }
});

