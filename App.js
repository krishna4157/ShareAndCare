import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Application from './src/containers/App';
import { View } from 'native-base';
import { Platform } from 'react-native';
const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export default function App() {
  if(Platform.OS=='web'){  
  return (
    <View style={SCREEN_WIDTH >= 1030 ? {flex:1, alignItems:'center', backgroundColor:'#b0bec5', overflow:'hidden' }: {flex:1}}>
    <View style={Platform.OS == 'web' ? { width: SCREEN_WIDTH >= 1030 ? 480: '100%', height: '99%', }:{flex:1}}>
      <Application />
    </View>
    </View>
    );
  } else {
      return (<Application />);
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function Welcome() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'yellow'
//   },
// });
