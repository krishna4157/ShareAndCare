import React from 'react';
import SnapSlider from 'react-native-snap-slider';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';


const sliderOptions = [
    // {value: 0, label: 'label A'},
    // {value: 1, label: 'label B'},
    // {value: 2, label: 'label C'},
    // {value: 3, label: 'label D'},
    // {value: 4, label: 'label E'},

    {value: 0, label: 'No Pain', color: '#2b884c'},
    {value: 1, label: 'Mild Pain', color: '#93be47'},
    {value: 2, label: 'Moderate Pain', color: '#f6ad34'},
    {value: 3, label: 'Severe Pain', color: '#f86f21'},
    {value: 4, label: 'Worst Possible Pain', color: '#d7000d'},
    
];
export default class Snapslider extends React.Component{
   state = {
        value: 2,
        orientation: 'vertical'
    };
    slidingComplete = (itemSelected) => {
    }
    
    render() {
        const { orientation } = this.state;
        return (
            // <ScrollView scrollEnabled>
            <View>
            {
                orientation === 'horizontal'
                ? <View style={styles.container}
                // style={{ minWidth: Dimensions.get('window').height - 100, transform: [
                //     { rotateZ : '-90deg' },
                // ],}}
                >
                {/* <Text style={styles.welcome}>
                    SnapSlider Example!
                </Text> */}
                <SnapSlider ref="slider"
                containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                    // itemWrapperStyle={styles.snapsliderItemWrapper}
                    // itemStyle={styles.snapsliderItem}
                    items={sliderOptions}
                    labelPosition="bottom"
                    value={this.state.value}
                    onSlidingComplete={this.slidingComplete} />
            </View>
            :  <View style={styles.container}
                >
                {/* <Text style={styles.welcome}>
                    SnapSlider Example!
                </Text> */}
                <SnapSlider
                    ref="slider"
                    containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                    itemWrapperStyle={styles.snapsliderItemWrapper}
                    itemStyle={styles.snapsliderItem}
                    items={sliderOptions}
                    labelPosition="top"
                    defaultItem={this.state.value}
                    onSlidingComplete={this.slidingComplete}
                    // minimumValue={0}
                    // maximumValue={10}
                    style={styles.snapslider}  
                    />
            </View>
            }
            
            </View>
            // </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    //   marginRight: 50,
    //   paddingTop: 100,
      paddingBottom: 230,
    //   paddingLeft: 100,
    //   paddingRight: 30,
    //   width: 300,
      transform:[{
     rotateZ: '-90deg'
   }],
    },
  
    // snapsliderContainer: {
    //   borderWidth: 0,
    //   backgroundColor: 'transparent',
    // },
    snapslider: {
      borderWidth: 0,
    },
    snapsliderItemWrapper: {
      alignContent: 'flex-start',
      borderWidth: 0,
    //   marginRight: 30,
    //   marginLeft: -20,
    },
    snapsliderItem: {
      // paddingLeft: 20,
      // paddingRight: 20,
      // paddingTop: 50,
      paddingBottom: 125,
    //   alignContent: 'flex-start',
    //   justifyContent: 'flex-end',
  
      transform:[{
     rotateZ: '90deg'
   }]
    },
  });