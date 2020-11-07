import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import {createForm} from 'rc-form';
import {backgroundColor} from '../../containers/NavigationScreens';
import OtpInput from './Input';
import styles from './forgotpasswordStyles';
import {getItem} from '../../utils/secureStorageUtils';
import api from '../../utils/api';
import showToast from '../../utils/toast';
class OtpVerification extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      otpData: null,
      loading: false,
      isWrongOtp: false,
    };
  }

  async componentDidMount () {
    try {
      let otpData = await getItem ('otpData');
      otpData = JSON.parse (otpData);
      this.setState ({
        otpData,
      });
    } catch (error) {}
  }

  changeLoading = () => {
    const {loading} = this.state;
    this.setState ({
      loading: !loading,
    });
  };

  submitOtp = () => {
    const {form} = this.props;
    form.validateFields ((error, values) => {
      if (!error) {
        const {otp} = values;
        this.validateOtp (otp);
      } else {
        showToast(localeStore.NetworkError, 'danger', 3000);
        console.log ('log error');
      }
    });
  };

  validateOtp = async otp => {
    this.changeLoading();
    const { navigation,screenProps } = this.props;
    try {
    const { otpData: { transactionId, phoneNumber } } = this.state;
    // alert(`${transactionId}  ${otp}`)
   
      res = await api.post('/subject/otp/validate', { otp, transactionId });
      this.setState({
        isWrongOtp: false,
      })
      navigation.replace('ResetPassword', { phoneNumber });
    } catch (error) {

      // this.changeLoading();
      setTimeout(() => {
        this.setState({loading:false});
      }, 1000);
     
      if(error.response) {
        if(error.response.status === 404) {
        this.displayWrongOtp();
        } 
        else {
          // this.changeLoading();
          console.log(error);
        }
      }
      else {
        showToast(screenProps.t('NetworkError'), 'danger', 3000);
        console.log(error);
      }
    }

  }

  resendOtp = async () => {
    const { screenProps: { t }} = this.props
    // alert(`${transactionId}  ${otp}`)
  try {
    const {otpData: {transactionId, phoneNumber}} = this.state;
      this.changeLoading ();
      const res = await api.post ('/subject/otp/resend', {phoneNumber, transactionId});
      this.changeLoading ();
      showToast(t('OTPResend'), 'success', 2000);
    } catch (error) {
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 1000);
      showToast(t('NetworkError'), 'danger', 3000);
      console.log (error);
    }
  }

  displayWrongOtp = () => {
    const { form } = this.props;
    this.setState({
      isWrongOtp: true,
    })
    setTimeout(() => {
      form.resetFields();
      this.setState({
        isWrongOtp: false,
      })
    }, 2000);
  }

  render () {
    const {form: {getFieldDecorator, getFieldError}, navigation, screenProps: { t }} = this.props;
    const {loading, isWrongOtp} = this.state;
    return (
      <View
        // keyboardVerticalOffset={Header.HEIGHT + 10}
        style={styles.container}
        behavior="padding"
        // enabled={true}
      >      
        <Card style={{borderRadius: 10}}>
          <CardItem style={{borderRadius: 10}}>
            <Body style={{alignItems: 'center', borderRadius: 10}}>
              {/* Forgot password? */}
              <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 25, color: '#455a64'}}>
                  {' '}{t('EnterOTP')}{' '}
                </Text>
                {getFieldDecorator ('otp', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: t('OtpEmpty'),
                    },
                    {
                      //validator: this.validatePhoneNumber,
                    },
                  ],
                }) (
                  <OtpInput
                    textInputProps={{
                      autoFocus: true,
                      keyboardType: 'phone-pad',
                    }}
                    style={{
                      textAlign: 'center',
                      fontSize: 23,
                      fontWeight: 'bold',
                      color: '#37474f',
                    }}
                    //   placeholder={placeholder}
                    //   placeholderTextColor={placeholderTextColor}
                  />
                )}
                {getFieldError ('otp')
                  ? getFieldError ('otp').map (errorInfo => (
                      <Text
                        style={{fontSize: 14, color: '#1976d2', paddingTop: 10}}
                      >
                        {errorInfo}
                      </Text>
                    ))
                  : <Text />}
                  { isWrongOtp ?
                    <Text
                    style={{fontSize: 16, color: '#1976d2', paddingTop: 10, alignSelf: 'center'}}
                    >{t('WrongOTP')}</Text> : <Text><Text/>
                    </Text>
                  }
              </View>
              <View style={{padding: 30}}>
                <TouchableOpacity
                  onPress={this.submitOtp}
                  style={{
                    borderRadius: 5,
                    backgroundColor,
                    padding: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={{color: '#fff'}}>{t('VerifyOTP')}</Text>
                </TouchableOpacity>
              </View>
              {/* Send OTP */}
              <View>
                <TouchableOpacity
                  onPress={this.resendOtp}
                  style={{paddingVertical: 20}}
                >
                  <Text style={{color: backgroundColor, fontSize: 12}}>
                  {t('ResendOTP')}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Verify OTP */}
            </Body>
          </CardItem>
        </Card>
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

export default createForm () (OtpVerification);
