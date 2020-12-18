import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserImage1 from '../../assets/user/user1.png';


const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

class ViewAccount extends React.Component {

    state = {
        pin: ''
    }

    getPin = (value) => {
        this.setState({
            pin: value
        });
        alert(this.state.pin);
    }




    render() {
        const {navigation} = this.props;
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent', height: '100%',width:'100%', justifyContent: 'flex-start', alignContent: 'flex-start', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{padding:10,paddingBottom:-20,borderBottomWidth:2,borderColor:'#20a7db',width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
                    <Text style={{ textAlign: 'center', padding: 10,paddingTop:20, fontSize: 30, fontFamily: 'RalewayBold' }}>Krishna</Text>
                <TouchableOpacity activeOpacity={1} onPress={()=> navigation.navigate('ViewImage')} style={{marginTop:10,padding:10,position:'absolute',marginLeft:'70%'}} >
                    <View>
                    <Image style={{height:60,zIndex:-10,width:60,borderRadius:60,alignSelf:'flex-end',borderWidth:5,borderColor:'#20a7db',padding:50,alignContent:'flex-end',alignItems:'flex-end'}} source={UserImage1} />
                    </View>
                </TouchableOpacity>
                </View>
                <ScrollView style={{width:'100%'}}>
                <TouchableOpacity style={{marginTop:80,flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'face-recognition'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Change Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('EditProfile');
                }} style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'account-edit'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                    <MaterialCommunityIcons name={'help'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Help</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('PinScreen',{ changePin : true,newPin: false, title : 'Enter Old Pin',oldPin : '123456'});
                }} style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                <MaterialCommunityIcons name={'onepassword'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>Change PIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',paddingLeft:10,borderBottomWidth:1,borderColor:'grey',width:'100%',alignItems:'flex-start'}}>
                <MaterialCommunityIcons name={'information-outline'} style={{ alignSelf: 'center', fontSize: 25 }} />
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 25 }}>About</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>);
    }
}

export default ViewAccount;
