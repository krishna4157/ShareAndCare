import React from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';
import { createForm } from 'rc-form';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import { styles } from './styles/loginStyles';
import { validateLoginDetails } from '../utils/loginUtils';
import { backgroundColor } from '../containers/NavigationScreens';
import logo from '../../images/rsz_7main_small.png'
import { NavigationEvents } from 'react-navigation';
// import CustomToast from './CustomToast'; 
// import DeviceInfo from 'react-native-device-info';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
import { changeLanguage } from '../actions/changeLanguage';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import * as Yup from 'yup';
import { encrypt } from '../utils/cryptoUtil';
import moment from 'moment';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';

var number = "";
class PhoneNoInput extends React.Component {
    constructor(props) {
        super(props);
        this.onPressFlag = this.onPressFlag.bind(this);
        this.selectCountry = this.selectCountry.bind(this);
        this.state={
            callingCode: '1',
            cca2: 'US',
            cc: '',
            phoneNummber: '',
            modalVisible: false,
        };
    }
    
    componentDidMount() {
      const { deviceLocation } = this.props
      const callingCode = deviceLocation.location.calling_code || '1';
      this.changeCallingCode(callingCode);
      this.setState({
        pickerData: this.phone.getPickerData(),
      });
    }

    changeCallingCode = (callingCode) => {
      const {changeCallCode}=this.props;
      changeCallCode(callingCode);
    }  

    onPressFlag(){
      this.setState({
        modalVisible: true,
      })
    }
  
    async selectCountry(country){
      const {getPhoneValue}=this.props;
      await this.phone.selectCountry(country.cca2.toLowerCase());
      this.changeCallingCode(country.callingCode[0]);
      // alert(number);
      // if(number!=""){
        await this.setState({
          cc : "+"+country.callingCode[0]
        });
      
      // alert(phoneNumber);
        var newNo = await this.validateValue(this.phone.getValue());
        getPhoneValue(newNo);
     
      this.setState({
        modalVisible: false,
      })
      // alert(cc);
    }

    validateValue=(value)=>{
      const  {cc}=this.state;
      let  numberWithOutCC ="";
      let temp = value.substring(0,cc.length);
      if(value!=""){
      if(temp == cc || number == cc){
        number =temp;
        numberWithOutCC = value.substring(cc.length);
      } else {
        numberWithOutCC = value;
      }
    }
      number = numberWithOutCC;
      return numberWithOutCC;

    }
      
    render(){
        const { modalVisible } = this.state;
        const { countryCode, form,t} = this.props;
        return (
                <View style={{padding:10, marginBottom: -25}}>
                    <PhoneInput
                        ref={ref => {
                            this.phone = ref;
                        }}
                        onPressFlag={this.onPressFlag}
                        initialCountry={countryCode}
                        style={{ borderColor: '#000',
                        borderBottomWidth: 0.5}}
                        onChangePhoneNumber={form.handleChange('phoneNo')} 
                        value={this.validateValue(form.values.phoneNo)} 
                        flagStyle={{width:30,height:20,marginLeft: 5, borderWidth:1,borderRadius:3}} 
                        offset={10} 
                        textProps={{placeholder:t('LoginACSUserID'), height:50}} 
                        textStyle={{fontSize:20,}} />
                        
                    {form.touched.phoneNo && form.errors.phoneNo ? (
                        <Text style={styles.error}>{form.errors.phoneNo}</Text>
                    ) : null}

                    <CountryPicker
                    withCloseButton={true}
                    withFilter={true}
                    filterProps={{
                        style:{
                        paddingVertical: 20
                        }
                    }}
                    withFlag={true}
                        visible={modalVisible}
                        onSelect={value => {
                        this.selectCountry(value)
                        // onCountryChange();
                        }}
                        cca2={this.state.cca2}
                        withCountryNameButton={false}
                        placeholder=''
                        onClose={() => {
                        this.setState({
                            modalVisible: false,
                        })
                        }}
                    >
                    </CountryPicker>     
                </View>
                    
        );
    }
}

export default PhoneNoInput;
