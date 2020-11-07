import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import {createForm} from 'rc-form';
import {backgroundColor} from '../../containers/NavigationScreens';
import TextInput from './Input';
import api from '../../utils/api';
import styles from './forgotpasswordStyles';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import showToast from '../../utils/toast';

class ResetPassword extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: false,
    };
  }

  changeLoading = () => {
    const {loading} = this.state;
    this.setState ({
      loading: !loading,
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form, screenProps: { t } } = this.props;
    if (value && value !== form.getFieldValue ('newPassword')) {
      callback (t('PSWD_NOT_MATCH'));
    }
      callback();
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && form.getFieldValue ('confirmPassword')) {
      form.validateFields (['confirmPassword']);
    }
    callback ();
  };

  validateMinLength = (rule, value, callback) => {
    const { form, screenProps: { t } } = this.props;
    if (value && form.getFieldValue ('newPassword').length < 4) {
      callback (t('PSWD_MIN_LENGTH'));
    }
    callback ();
  };

  resetPassword = () => {
    const {form, navigation} = this.props;
    const phoneNumber = navigation.getParam ('phoneNumber');
    const values = form.getFieldsValue ();
    if (
      values.newPassword &&
      values.newPassword.length > 3 &&
      values.newPassword === values.confirmPassword
    ) {
      const subject = {
        password: values.confirmPassword,
        phoneNo: phoneNumber,
      };
      this.submitNewPassword (subject);
    } else {
      form.validateFields ();
      // form.getFieldError ('newPassword').map (errorInfo => (
      //   <Text
      //     key={errorInfo}
      //     style={{fontSize: 14, color: '#1976d2', paddingTop: 10}}
      //   >
      //     {errorInfo}
      //   </Text>
      // ))
    }
  };

  submitNewPassword = async subject => {
    const {navigation, screenProps: { t }} = this.props;
    this.changeLoading();
    try {
     const res = await api.post ('/subject/resetPassword', subject);
      showToast(t('PswdResetSuccess'), 'success', 2000);
      navigation.goBack ();
    } catch (error) {
      this.setState({
        loading: false
      })
      if(error.response) {
        if(error.response.status === 500) {
          showToast(t('FailedResetPWD'), 'danger', 3000);
        } 
        else {
          console.log(error);
        }
      }
      else {
        showToast(t('NetworkError'), 'danger', 3000);
        console.log(error)
      }
    }
  };

  render () {
    const {form: {getFieldDecorator, getFieldError}, navigation, screenProps: { t }} = this.props;
    const {loading} = this.state;
    return (
      <View
        // keyboardVerticalOffset={Header.HEIGHT + 10}
        style={styles.container}
        // behavior="padding"
        // enabled={true}
      >
        {loading && 
          <View style={{flex:1,position:'absolute',alignItems:'center',alignSelf:'center'}}>
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        }       
        <Card style={{borderRadius: 10}}>
          <CardItem style={{borderRadius: 10}}>
            <Body style={{alignItems: 'center', borderRadius: 10}}>
              {/* Forgot password? */}
              <View style={{paddingVertical: 10}}>
                <Text style={{fontSize: 25, color: '#455a64'}}>
                  {t('ResetPassword')}
                </Text>
              </View>
              <View style={{paddingTop: 10, alignItems: 'flex-start'}}>
                <Text style={{color: '#90a4ae'}}>
                  {t('NewPassword')}
                </Text>
                {getFieldDecorator ('newPassword', {
                  rules: [
                    {
                      required: true,
                      message: t('PswdEmpty'),
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                    {
                      validator: this.validateMinLength,
                    },
                  ],
                }) (
                  <TextInput
                    textInputProps={{autoFocus: true, secureTextEntry: true}}
                    //   placeholder={placeholder}
                    //   placeholderTextColor={placeholderTextColor}
                  />
                )}
                {getFieldError ('newPassword') !== undefined
                  ? getFieldError ('newPassword').map (errorInfo => (
                      <Text
                        key={errorInfo}
                        style={{fontSize: 14, color: '#1976d2', paddingTop: 10}}
                      >
                        {errorInfo}
                      </Text>
                    ))
                  : <Text />}
              </View>
              <View style={{paddingTop: 10, alignItems: 'flex-start'}}>
                <Text style={{color: '#90a4ae'}}>
                  {t('ConfirmPassword')}
                </Text>
                {getFieldDecorator ('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: t('CnfPswdEmpty'),
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                }) (
                  <TextInput
                    textInputProps={{secureTextEntry: true}}
                    //   placeholder={placeholder}
                    //   placeholderTextColor={placeholderTextColor}
                  />
                )}
                {getFieldError ('confirmPassword') !== undefined
                  ? getFieldError ('confirmPassword').map (errorInfo => (
                      <Text
                        key={errorInfo}
                        style={{fontSize: 14, color: '#1976d2', paddingTop: 10}}
                      >
                        {errorInfo}
                      </Text>
                    ))
                  : <Text />}
              </View>
              <View style={{padding: 30}}>
                <TouchableOpacity
                  onPress={this.resetPassword}
                  style={{
                    borderRadius: 5,
                    backgroundColor,
                    padding: 10,
                    paddingHorizontal: 40,
                  }}
                >
                  <Text style={{color: '#fff'}}>{t('Save')}</Text>
                </TouchableOpacity>
              </View>
              {/* Send OTP */}
              {/* Verify OTP */}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default createForm () (ResetPassword);
