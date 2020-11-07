// import React from 'react';
// import { Text, View } from 'react-native';

// export default class SliderExample extends React.Component {
//   state = {
//       changingValue: 0.25,
//       changedValue: 0.15,
//       minMaxValue: 0,
//       slideCompletionCount: 0,
//     };

//   handleChange = (value) => {
//     this.setState({
//       changingValue: value,
//     });
//   }

//   onAfterChange = (value) => {
//     this.setState({
//       changedValue: value,
//     });
//   }

//   minMaxChange = (value) => {
//     this.setState({
//       minMaxValue: value,
//     });
//   }

//   render() {
//     return (
//       <View>
//         <View>
//           <Text>Default settings</Text>
//           <Slider />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>Initial value: 0.5</Text>
//           <Slider defaultValue={0.5} />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>min: 0, max: 1, current Value: {this.state.minMaxValue}</Text>
//           <Slider
//             min={0}
//             max={1}
//             onAfterChange={(value) => this.minMaxChange(value)}
//           />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>step: 0.25</Text>
//           <Slider step={0.25} value={0.25} />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>disabled</Text>
//           <Slider disabled defaultValue={0.25} />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>onChange value: {this.state.changingValue}</Text>
//           <Slider
//             defaultValue={0.25}
//             onChange={(value) => this.handleChange(value)}
//           />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>onAfterChange value: {this.state.changedValue}</Text>
//           <Slider
//             defaultValue={0.15}
//             onAfterChange={(value) => this.onAfterChange(value)}
//           />
//         </View>

//         <View style={{ marginTop: 20 }}>
//           <Text>custom color: </Text>
//           <Slider
//             defaultValue={0.15}
//             minimumTrackTintColor="red"
//             maximumTrackTintColor="blue"
//           />
//         </View>
//       </View>
//     );
//   }
// }

import React from "react";
import Slider from "../Slider/react-native-slider/src/Slider";
// import Slider from "react-native-slider";
import { StyleSheet, View, Text } from "react-native";

export default class SliderExample extends React.Component {
  state = {
    value: 2000
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
        value={4}
        onValueChange={value => this.setState({ value })}
        // thumbStyle={{
        // backgroundColor: 'white',
        // // borderColor: colors.purple1,
        // borderWidth: 3
        // }}
        // minimumTrackTintColor={colors.purple1}
        // maximumTrackTintColor={}
        step={2}
        trackStyle={{
          
        }}
        minimumValue={0}
        maximumValue={10}
        />

        {/* <Slider
        orientation="vertical"
        inverted
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        // thumbStyle={{
        // backgroundColor: 'white',
        // // borderColor: colors.purple1,
        // borderWidth: 3
        // }}
        minimumTrackTintColor="blue"
        // maximumTrackTintColor={}
          style={{ marginTop: 300, marginBottom: 150, marginLeft: 150, transform: [
                    { rotateZ : '-90deg' },
                ],}}
        // step={1000}
        minimumValue={1000}
        maximumValue={10000}
        /> */}


        <Text>
          Value: {this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});