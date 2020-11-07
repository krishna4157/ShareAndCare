import React from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';
import { createForm } from 'rc-form';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import * as Yup from 'yup';
import { encrypt } from '../utils/cryptoUtil';
import moment from 'moment';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
import { backgroundColor } from '../containers/NavigationScreens';
// import PhoneNumberInput from './forgotPassword/Input';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';

var number = "";
class PhNumberInput extends React.Component {

  state = {
    phoneCode : '',
    phoneNumber: ''
  }

  componentDidMount() {
    const { callingCode, deviceLocation } = this.props;
    const phoneCode = Platform.OS === 'web' ? callingCode : deviceLocation.location.calling_code || '1';
    this.setState({
      phoneCode,
    })
  }

  componentDidUpdate(prevProps) {
    const { callingCode } = this.props;
    const phoneCode = callingCode
    if(prevProps.callingCode !==callingCode)
      this.setState({
        phoneCode,
      })
  }

    getPhoneData = async() => {
      const  {phoneCode, phoneNumber} = this.state;
      const { getPhoneValue } = this.props;
      const phNo = phoneCode+phoneNumber;
      getPhoneValue(phNo);
    }
    
    render(){
      const { getPhoneValue,t,fromPinChange } = this.props;
      const {phoneNumber,phoneCode} = this.state;
        return (
             <View style={{padding:10}}>
               <View style={{flexDirection:'row',width:'100%'}}>
               <Item style={{ borderBottomWidth: 2,flex:1,justifyContent:'center'}}>
                               <Input
                               style={{textAlign:'center',alignItems:'center'}}
                               maxLength={5} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                              //  style={{color:'black'}}
                               value={phoneCode}
                               onChangeText={(value)=>{
                                 this.setState({
                                   phoneCode: value
                                 });
                                 getPhoneValue(value,phoneNumber);
                               }} 
                               />
                           </Item>
                           <View style={{flex:0.1,justifyContent:'center',alignContent:'center'}}>
                           <Text style={{fontSize:25,textAlign:'center'}}>-</Text>
                           </View>
                           <Item style={{ borderBottomWidth: 1,flex:5}}>
                               <Input
                               maxLength={10}
                               placeholder={t('LoginACSUserID')} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                               style={fromPinChange ? {color:'black',width:'10%'} : {color:'black'}} 
                               onChangeText={(value)=>{
                                this.setState({
                                  phoneNumber: value
                                });
                                getPhoneValue(phoneCode,value);
                              }} 
                               />
                           </Item>
                           </View>
             </View>   
            
        );
    }
}

export default PhNumberInput;
