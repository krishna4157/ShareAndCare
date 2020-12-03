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
    const phoneCode = Platform.OS === 'web' ? callingCode : '91';
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

    replaceText = (value) => {
      var changeToNumeric = value.replace(/[^0-9]/g, '');
      return changeToNumeric;
    }
    
    render(){
      const { getPhoneValue,t,fromPinChange } = this.props;
      const {phoneNumber,phoneCode} = this.state;
        return (
             <View style={{padding:10}}>
               <View style={{flexDirection:'row',width:'100%'}}>
               <Item style={{ borderBottomWidth: 2,flex:1,justifyContent:'center'}}>
                               <Input
                               style={{textAlign:'center',alignItems:'center',outlineWidth: 0}}
                               maxLength={5} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                               value={phoneCode}
                               onChangeText={(value)=>{
                                 this.setState({
                                   phoneCode: this.replaceText(value),
                                 });
                                 getPhoneValue(this.replaceText(value),phoneNumber);
                               }} 
                               />
                           </Item>
                           <View style={{flex:0.1,justifyContent:'center',alignContent:'center'}}>
                           <Text style={{fontSize:25,textAlign:'center'}}>-</Text>
                           </View>
                           <Item style={{ borderBottomWidth: 1,flex:5}}>
                               <Input
                               value={phoneNumber}
                               maxLength={10}
                               placeholder={t('LoginACSUserID')} 
                               keyboardType="default"
                               placeholderTextColor='#bdbdbd' 
                               style={fromPinChange ? {color:'black',width:'10%',outlineWidth: 0} : {color:'black',outlineWidth: 0}} 
                               onChangeText={(value)=>{
                                this.setState({
                                  phoneNumber: this.replaceText(value),
                                });
                                getPhoneValue(phoneCode,this.replaceText(value));
                              }} 
                               />
                           </Item>
                           </View>
             </View>   
            
        );
    }
}

export default PhNumberInput;
