import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';

export class CustomMarker extends Component {
  render() {
    return (
    //     <Image
    //     style={styles.image}
    //     source={require('../../images/slider-button.png')}
    //     resizeMode="contain"
    //   />
      <View style={styles.container}>
       
       <View style={styles.circle1}>
       </View>

     </View>
    );
  }
}

const styles = StyleSheet.create({
    circle1: {
        width: 25,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#1565c0',
        // borderWidth:1,
        position:'absolute'
    },
    circle2: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4eaa37',
        position:'absolute',
        justifyContent: 'center', 
        alignSelf:'center',
        zIndex:1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
      },
     
      CircleShapeView: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f44336'
    },
    image:{
        width:30, height:30
    }
});
