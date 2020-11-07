import React, {Component} from 'react';
import { View } from 'react-native-web/dist';
// import { TriangleColorPicker } from 'react-native-color-picker'

export default class Theme extends Component {
    state={};
    static navigationOptions = {
        title: 'Change Theme',
      };
      render () {
        return (
          <View />
            // <TriangleColorPicker
            //     hideSliders
            //     onColorSelected={color => alert(`Color selected: ${color}`)}
            //     style={{flex: 1, backgroundColor: '#263238'}}
            // />
        )
      }
    
}