import React from 'react';
import {View, TouchableOpacity, Alert, Keyboard, ActivityIndicator} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import {createForm} from 'rc-form';
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {backgroundColor} from '../../containers/NavigationScreens';
import PhoneNumberInput from './Input';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-native-phone-input';
import * as Yup from 'yup';
import styles from './forgotpasswordStyles';
import api from '../../utils/api';
import {putItem} from '../../utils/secureStorageUtils';
import showToast from '../../utils/toast';
import { validatePhoneNumber } from '../../utils/phoneNumberValidation';
import PhoneNoInput from '../PhoneNoInput';
import PhNumberInput from '../PhNumberInput';

class UserValidation extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
      callingCode: '1',
    };
  }

  componentDidMount() {
    const { deviceLocation } = this.props
    const callingCode = deviceLocation.location.calling_code || '1';
    this.changeCallCode(callingCode);
  }

  changeLoading = () => {
    const {loading} = this.state;
    this.setState ({
      loading: !loading,
    });
  };

  validatePhoneNumber = (rule, value, callback) => {
    const { screenProps: { t } } = this.props;
    const phoneNumber = parsePhoneNumberFromString (value);
    if (phoneNumber === undefined || !phoneNumber.isValid () === true) {
      callback (t('NotValidPhone'));
    } else {
      callback ();
    }
  };

  submitPhoneNumber = (values) => {
    const { callingCode } = this.state;
    const subjectPhoneNo = `+${values.phoneNo}`;
    console.log(subjectPhoneNo);

    this.verifyAndGenerateOtp (subjectPhoneNo);
  };

  verifyAndGenerateOtp = async phoneNumber => {
    const {navigation, screenProps: { t }} = this.props;
    Keyboard.dismiss();
    try {
      this.changeLoading ();
      const res = await api.post ('/subject/otp', {phoneNumber});
      alert(JSON.stringify(res));
      const transactionId = res.data.transactionId;
      const otpData = {
        phoneNumber,
        transactionId,
      };
      await putItem (JSON.stringify (otpData), 'otpData');
      this.changeLoading ();
      navigation.replace ('OtpVerification');
    } catch (error) {
      console.log(error);
      this.changeLoading ();
      if (error.response) {
        switch (error.response.status) {
            case 400:
              this.contactAdmin();
            case 404:
                showToast(t('NetworkError'), 'danger', 3000);
                this.userNotFound();
                break;
            case 500:
                showToast(t('SomethingWrong'), 'danger', 3000);
                break;
            case 401 || 403:
                showToast(t('InvPhonePSWD'), 'danger', 3000);
                break;
            case 423 :
                showToast(t('UserLocked'), 'danger', 10000);
                // this.contactAdmin();
                break;  
            default:
                showToast(t('NetworkError'), 'danger', 3000);
        }
        // showToast(t('NetworkError'), 'danger', 3000);
      } else {
        showToast(t('NetworkError'), 'danger', 3000);
      }
    
    }
  };

  userNotFound = () => {
    const { screenProps: { t }} = this.props;
      showToast(t('PhoneNotReg'), 'default',5000);
  }

  contactAdmin = () => {
    const { screenProps: { t }} = this.props;
    showToast(t.SomethingWrong, 'default',3000);
}

changeCallingCode = (callingCode) => {
  this.setState({
      callingCode,
  })
}  


changeCallCode =(callCode)=>{
  this.setState({
    callingCode : callCode
  })
}

  render () {
    const {form: {getFieldDecorator, getFieldError},navigation, screenProps: { t }, deviceLocation} = this.props;
    const { callingCode,loading} = this.state;
    const countryCode = deviceLocation.country_code ? deviceLocation.country_code.toLowerCase() : 'us'

    return (
      <View
        style={styles.container}
        // behavior="padding"
        // enabled={true}
      >
        <Formik
          initialValues={{ phoneNo: ''}}
          validationSchema={Yup.object({
            phoneNo: Yup.string().test("len", "Must be a valid Phone Number.", val => {
                return validatePhoneNumber(val, callingCode);
               }).required(t('USRNAMEWARNING')),
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              console.log(JSON.stringify(values));

              // Alert.alert(JSON.stringify(values));
               this.submitPhoneNumber(values);
              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {props =>{
             const {
               setFieldValue,setValues
            } = props;
          
            const getPhoneValue=(value,phoneNo)=>{
              setFieldValue(
                    'phoneNo',value+phoneNo)
            }
          
            return (
        <Card style={{borderRadius: 10,flexShrink:1,overflow:'hidden'}}>
          <CardItem style={{borderRadius: 10}}>
            <Body style={{alignItems: 'center', borderRadius: 10}}>
              {/* Forgot password? */}
              <View>
                <Text style={{fontSize: 25, color: '#455a64'}}>
                  {t('LoginACSFrgtPwd')}
                </Text>
              </View>
              <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 14, color: '#455a64'}}>
                  {t('OTPMSG')}
                </Text>
              </View>
              <View style={{paddingTop:20}}>
              <Text style={{fontSize:14,color: '#455a64'}}>{t('FP_PNO')}</Text>
                </View>
                <View style={{alignSelf: 'baseline',overflow:'hidden'}}>
                      <PhNumberInput 
                      fromPinChange={true}
                      deviceLocation={deviceLocation}
                       t={t} getPhoneValue={getPhoneValue}  />
                            {/* <Text>{props.values.phoneNo}</Text> */}
              {props.touched.phoneNo && props.errors.phoneNo ? (
                <Text style={styles.error} >{props.errors.phoneNo}</Text>
              ) : null}
              </View>
              <View style={{padding: 30}}>
                <TouchableOpacity
                  onPress={props.handleSubmit}
                  style={{
                    borderRadius: 5,
                    backgroundColor,
                    padding: 10,
                    paddingHorizontal: 40,
                  }}
                >
                  <Text style={{color: '#fff'}}>{t('Submit')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    paddingTop: 20,
                    alignSelf: 'center'
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{color: backgroundColor}}>{t('Cancel')}</Text>
                </TouchableOpacity>
              </View>
            </Body>
          </CardItem>
        </Card>)}}
        </Formik>
        {loading && 
          <View style={{flex:1,position:'absolute',alignItems:'center',alignSelf:'center'}}>
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        }  
      </View>
    );
  }
}

export default createForm () (UserValidation);
