import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';




class AccountDetailsScreen extends React.Component {

state = {
  pin : ''
}

  getPin = (value) => {
    this.setState({
      pin : value
    });
    alert(this.state.pin);
  }
    

    
      
    render(){
        // const  {text} = this.props;
        return (
        <View style={{flex:1,backgroundColor:'transparent'}}>
          <Text>HELLO</Text>
        </View>);
    }
}

export default AccountDetailsScreen;
