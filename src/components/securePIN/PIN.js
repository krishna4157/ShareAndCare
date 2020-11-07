import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  // KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-navigation-stack';
import { putItem } from '../../utils/secureStorageUtils';
import styles from './pinStyles';
import { backgroundColor } from '../../containers/NavigationScreens';


export default class PIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingText: props.screenProps.t('EnterPIN'),
      newPincode: null,
      confirmedPinCode: null,
      mode: 'choose',
      isValidPincode: false,
      wrongConfirmation: false,
      attempts:0,
      maxAttempts:false,
      loading: false,
      pinValue: ''
    };
  }

  componentDidMount() {
    const { mode, screenProps: { t } } = this.props;
    // setCurrentScreen("PIN");
  this.setState((prevState) => ({
    ...prevState,
    wrongConfirmationText: mode === 'validate' ? t('WrongPIN') : t('PINS_NOT_MATCH'),
    headingText: mode === 'validate' ? t('EnterPIN') : t('MinPin')
  }));
  }

  alertIncorrectPIN = () => {
    const {attempts}= this.state;
    if(attempts<3){
      setTimeout(() => {
        this.setState({
          wrongConfirmation: false,
          attempts:attempts+1,
        });
        this.refs.pinInput.clear();
      }, 1000);
      this.setState({
        wrongConfirmation: true,
      });
    } else {
      setTimeout(() => {
        this.setState({
          maxAttempts: false,
          attempts:attempts+1,
        });
        this.refs.pinInput.clear();
      }, 1000);
      this.setState({
        maxAttempts: true,
      });
    }
  }
  
  onPinEntry = (isValid, code) => {
    const { newPincode } = this.state;
    if(code === undefined) {
        const pincode = isValid;
        if(newPincode && pincode === newPincode) {
            this.setState((prevState) => ({
              ...prevState,
                confirmedPinCode: pincode,
            }));
        } else if (newPincode && pincode !== newPincode) {
          this.setState((prevState) => ({
            ...prevState,
              confirmedPinCode: null,
          }));
        }
    } else if (isValid) {
        this.setState((prevState) => ({
          ...prevState,
          isValidPincode: true,
        }));
    } else if (!isValid) {
      this.setState((prevState) => ({
        ...prevState,
        isValidPincode: false,
      }));
    }
  }

  onLogin = () => {
    const { login } = this.props;
    const { isValidPincode } = this.state;
    if(!isValidPincode) {
      this.alertIncorrectPIN();
    } else {
      login();
    }
  }

  onNext = () => {
      const { pinValue } = this.state;
      const { screenProps: { t }} = this.props;
    this.setState((prevState) => ({
      ...prevState,
        headingText: t('ConfirmPIN'),
        newPincode: pinValue,
    }));
    this.refs.pinInput.clear();
  }

  onReset = () => {
    const { screenProps: { t }} = this.props;
    this.setState({
      headingText: t('MinPin'),
      newPincode: null,
      confirmedPinCode: null,
      mode: 'choose',
      isValidPincode: false,
      wrongConfirmation: false,
      loading: false,
      pinValue: ''
    });
    this.refs.pinInput.clear();
  }

  changeLoading = (loading) => {
    this.setState((prevState) => ({
      ...prevState,
      loading,
    }))
  }

  storePinAndNavigate = (pin) => {
    const { navigation, changePin, changeLoading } = this.props;
    changeLoading();
    setTimeout(async () => {
      try {
        await putItem(pin, 'appPin');
        changeLoading();
        if (changePin) {
          navigation.goBack();
        }
        else {
          navigation.navigate('SubjectTimeZone', {fromLogin: true});
        }
      } catch(error) {
        console.log(error);
        changeLoading();
      }
    }, 1500)
  }

  onConfirm = () => {
      const { confirmedPinCode } = this.state;
      if(confirmedPinCode) {
        this.storePinAndNavigate(confirmedPinCode);
      } else {
        this.alertIncorrectPIN();
      }
  }

  onInputCodeChange = (text) => {
    const { appPin } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      pinValue: text,
    }));
    if (appPin) {
      this.onPinEntry(appPin === text, text);
    } else if (!appPin) {
      this.onPinEntry(text)
    }
  }

  changePin = () => {
    const { navigation } = this.props;
    const { isValidPincode } = this.state;
    if(!isValidPincode) {
      this.alertIncorrectPIN();
    } else {
      setTimeout(() => navigation.replace('AppLock'), 500 );
    }
  }

  renderTitleComponent = () => {
    const { mode, screenProps: { t } } = this.props;
    if(mode === 'choose') {
      return (
        <View style={{ flex:1, justifyContent: 'flex-end' }}>
          <Text style={styles.instructionText}>{t('SetAppLock')}</Text>
        </View>
      );
    } return <View/>
  }
  
  render() {
    const { headingText, loading, newPincode, pinValue,
      wrongConfirmation, wrongConfirmationText, attempts,maxAttempts} = this.state;
    const { changePin, mode, navigation, screenProps: { t } } = this.props;
    return (
      // <KeyboardAvoidingView
      // keyboardVerticalOffset = {Header.HEIGHT + 10} 
      // style={styles.container}
      // behavior= "padding"
      // enabled={true}>
      <View style={styles.container}>
      
          { mode === 'validate' ? <View style={{ flex: 2}}>
            {/* <AcsLogo size={70}/> */}
          </View> : <View style={styles.titleWrapper}>
            {this.renderTitleComponent()}
          </View>  }
          <View style={styles.inputWrapper}>
            { wrongConfirmation
            ? <Text style={[styles.inputLabel, { fontSize: 18, color: '#f4511e' }]}>{wrongConfirmationText}</Text>
            : maxAttempts ?
            <Text style={[styles.inputLabel, { fontSize: 18, color: '#f4511e' }]}>{t('MaxAttemptsDone')}</Text>
           :<Text style={styles.inputLabel}>{headingText}</Text>
            }
            <TextInput
              ref="pinInput"
              secureTextEntry
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              autoFocus
              value={pinValue}
              onChangeText={text => this.onInputCodeChange(text)}
              maxLength={6}
              selectionColor='#64b5f6'
              style={styles.inputItem}
            />
            <View style={styles.horizontalBar}></View>
          </View>
          { mode === 'validate'
           // Below code for login button
          ? <View style={{ flex: 2 }}>
          <TouchableOpacity disabled={maxAttempts || attempts>3 ? true:false} style={[styles.loginButton, {backgroundColor}]} onPress={() => { if(attempts >2){
            this.setState({maxAttempts:true,
            attempts:attempts+1});
          }else {changePin ? this.changePin() : this.onLogin()}}}>
                <Text style={styles.buttonText}>{changePin ? t('OK') : t('LoginACSLogin')}</Text>
              </TouchableOpacity>
          { !changePin && <View><Text style={[styles.buttonText,{color: backgroundColor, marginTop: 20}]}>or</Text><TouchableOpacity style={{ alignSelf: 'center', marginTop: 20}} onPress={() => {setTimeout(() => navigation.replace('Login'), 0)}}>
              <Text style={[styles.buttonText, {color: backgroundColor, fontSize: 12, paddingVertical: 20}]}>{t('LoginPhPW')}</Text></TouchableOpacity></View>}
            </View>
             // Below code for pin choose buttons
          : <View style={{ flex: 2, flexDirection: 'row' }}>
              {/* reset button */}
              { newPincode
              ? <View style={{ flex: 3, justifyContent: 'flex-start', }}>
                  <TouchableOpacity onPress={() => this.onReset()} style={[styles.button, {backgroundColor: '#eceff1', alignSelf: 'flex-start'}]}>
                    <Text style={[styles.buttonText, {color: backgroundColor,}]}>{t('Reset')}</Text>
                  </TouchableOpacity>
                </View>
                : <View style={{flex:3}}/>
              }
              {/* next or confirm button */}
            <View style={{ flex: 3, justifyContent: 'flex-start'}}>
              { newPincode
              ? <TouchableOpacity disabled={newPincode.length < 4  ? true : false } style={[styles.button, {backgroundColor}]} onPress={() => this.onConfirm()}>
                  <Text style={styles.buttonText}>{t('Confirm')}</Text>
                </TouchableOpacity>
              : <TouchableOpacity disabled={pinValue.length < 4 ? true : false } style={[styles.button, { backgroundColor: pinValue.length < 4 ? '#eceff1' : backgroundColor }]} onPress={() => this.onNext()}>
                  <Text style={styles.buttonText}>{t('Next')}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
           }
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

PIN.defaultProps = {
  mode: 'choose',
}