import { Text } from 'native-base';
import React from 'react';
import { Clipboard, Image, TouchableOpacity, View } from 'react-native';
import UserImage from '../../assets/user/user.png';
import UserImage1 from '../../assets/user/user1.png';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';



class ViewImage extends React.Component {

state = {
  pin : ''
}

    
  readFromClipboard = async () => {   
    const clipboardContent = Clipboard.setString("Krishna4157");   
    this.setState({ clipboardContent }); 
    showToast('ID Copied', 'success', 2000);  

  };

    
      
    render(){
        const  {text,navigation} = this.props;
        var array = [UserImage,UserImage1];
        var randomNumber = Math.floor(Math.random() * Math.floor(array.length));
        return (
        <View style={{flex:1,justifyContent:'center',backgroundColor:'black',padding:10}}>
            <View style={{flex:3,padding:10}}>
            <Image source={UserImage1} style={{resizeMode:'contain',alignSelf:'center',height:'100%',width:'100%'}}/>
            </View>
            <View style={{flex:3,justifyContent:'flex-end'}}>
            <Text style={{textAlign:'center',fontSize:30,padding:0,justifyContent:'flex-end'}}>ID</Text>
            <TouchableOpacity onPress={this.readFromClipboard}>
            <Text style={{textAlign:'center',fontSize:40,padding:20,justifyContent:'flex-end'}}>Krishna4157</Text>
            </TouchableOpacity>
            </View>
        </View>);
    }
}

export default ViewImage;
