import React from 'react';
import { StyleSheet, Text, View, PanResponder, Easing, Dimensions } from 'react-native';
import { CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';

const MAX_POINTS = 100;

export default class Example extends React.Component {

  state = {
    isMoving: true,
    pointsDelta: 75,
    points: 0
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(prevState => ({
        ...prevState,
        points: 75
      }));
    }, 500)
    
  }

  render() {
    const { color, bgColor, value, label } = this.props;
    const fill = value / MAX_POINTS * 100;

    return (
      <View style={{flex:1, backgroundColor: '#2A1950',padding:15,paddingLeft:20,paddingRight:20}} >
          <View style={{marginLeft:35,marginRight:35}}>
            <AnimatedCircularProgress
            size={100}
            width={10}
            fill={fill}
            tintColor={color}
            backgroundColor={bgColor}
            duration={2000}
            rotation={-360}
            easing={Easing.bezier(.64,.62,.7,.69)}
            lineCap="square"
          >
            {(fill) => (
              <View style={{justifyContent: 'center'}}>
              <Text style={styles.points}>
                { Math.round(MAX_POINTS * fill / 100) }%
              </Text>
              </View>
              
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  points: {
    backgroundColor: '#2A1950',
    position: 'absolute',
    alignSelf: 'center',
    width: 60,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'WorkSansThin',
    fontSize: 18,
    fontWeight: "100"
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2A1950',
    // padding: 30,
    width: deviceWidth - 180,
    height: 180,
  },
  pointsDelta: {
    color: '#fff',
    fontSize: 50,
  },
  pointsDeltaActive: {
    color: '#fff',
  },
  label: {
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'RalewayExtraLight',
    fontSize: 14,
  }
});