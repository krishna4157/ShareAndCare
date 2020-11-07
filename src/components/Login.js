import React, { useRef, useEffect } from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity, ActivityIndicator,Animated as NewAnimated } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';
import { createForm } from 'rc-form';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneNumberInput from './PhoneNoInput';
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
import { validateLoginDetails } from '../utils/loginUtils';
import { backgroundColor } from '../containers/NavigationScreens';
import logo from '../assets/images/cloud_load.gif'
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
import PhoneNoInput from './PhoneNoInput';
import PhNumberInput from './PhNumberInput';
import axios from 'axios';
import Colors from '../constants/Colors';
import { Animated, StyleSheet } from 'react-native-web';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(0),
      wrongValue: new Animated.Value(0),
      endValue: 150,
      duration: 5000,
      isVisible: false
    };
  }

  componentDidMount() {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      this.setState({
        isVisible: true
      })
    }, 4000);
  }


  getWrongPassword = () => {
    Animated.timing(this.state.wrongValue, {
      toValue: 300,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  }
    
  //     wrongPassword=()=>{
  //   // NewAnimated.spring(this.moveAnimation, {
  //   //   toValue: {x: -180, y: 0},
  //   // }).start();
  //   this.setState({
  //     passwordColor: 'red'
  //   })
  //   setTimeout(()=>{
  //     this.setState({
  //       passwordColor:'#3498DB'
  //     });
  //     NewAnimated.spring(this.moveAnimation, {
  //       toValue: {x: -180, y: 0},
  //     }).start();
  //     NewAnimated.spring(this.textAnimation, {
  //       toValue: {x: 20, y: 0},
  //     }).start();
  //   },5000)
  // }

  // rightPassword=()=>{
  //   this.setState({
  //     passwordColor: 'green'
  //   })
  //   this.setDataAndNavigate()

  // }

  // loginValidate = () => {
  //   NewAnimated.spring(this.moveAnimation, {
  //     toValue: {x: 0, y: 0},
  //   }).start();
  //   NewAnimated.spring(this.textAnimation, {
  //     toValue: {x: -150, y: 0},
  //   }).start();
  //   // this.wrongPassword();
  //   this.rightPassword();
  //   // this.setDataAndNavigate()

  // }

  // moveRight = () => {
  //   NewAnimated.spring(this.moveAnimation, {
  //     toValue: {x: -215, y: 0},
  //   }).start()
  // }

  //   animate (easing) {
  //     this.animatedValue.setValue(0)
  //       Animated.timing(
  //         this.animatedValue,
  //         {
  //           toValue: 1,
  //           duration: 100,
  //           easing
  //         }
  //     ).start()
  //   }

  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }
      
    render(){
        const { image, subject, errorMessage, showPassword,language,languageSelected, callingCode, modalVisible } = this.state;
        const { loading, navigation, screenProps,currentScreen, deviceLocation } = this.props;
        const { t } = screenProps;
        const  { isVisible } =this.state;
      // alert(callingCode);
        return (
          <View style={{flex:1,justifyContent:'center'}}>
          
          <View style={{flex:3,backgroundColor:'green',borderBottomRightRadius:360}}>
          <Animated.View
            style={
              {
                transform: [
                  {
                    translateY: this.state.startValue,
                  },
                ],
            }}
          >          
          <FadeInView>
          <Image
        source={logo}
        style={{height:100,width:100,alignSelf:'center'}}
      />
            <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Share And Care</Text>
          </FadeInView>
        </Animated.View>
        </View>

        <View style={{flex:3}}>
        {isVisible && <FadeInView>
          <Formik
          initialValues={{ phoneNo: '', password: '' ,
          // language: ''
        }}
          validationSchema={Yup.object({
            phoneNo: Yup.string().test("len", "Must be a valid Phone Number.", val => {
                return validatePhoneNumber(val);
               }).required(t('USRNAMEWARNING')),
            password: Yup.string()
              .required(t('PWDWARNING')),
              // language: Yup.string()
              // .required(t('LanguageValidate'))
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              // console.log(JSON.stringify(values));

              // Alert.alert(JSON.stringify(values));
               this.onSubmit(values);
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
                    <View>
                    <NavigationEvents
                   onWillFocus={() => {
                       this.resetCredentials();
                     }}
                 />
               <View>
                      <PhNumberInput 
                      deviceLocation={deviceLocation}
                      callingCode={callingCode}
                       t={t} getPhoneValue={getPhoneValue}  />
                            {/* <Text>{props.values.phoneNo}</Text> */}
              {props.touched.phoneNo && props.errors.phoneNo ? (
                <Text style={[styles.error,{paddingLeft:10}]} >{props.errors.phoneNo}</Text>
              ) : null}
              </View>
              
              {/* </View> */}
              <View style={{padding:10}}>
              <Item style={[styles.inputStyle]}>
                             <MaterialIcons name='lock-outline' size={20} color="#bdbdbd" style={styles.icon} />
                             <Input 
                             keyboardType="default"
                             value = {props.values.password}
                            //  value={subject.password} 
                             placeholder={t('LoginACSPwd')} 
                             placeholderTextColor='#bdbdbd' 
                             secureTextEntry={true} 
                             style={styles.inputText} 
                             onChangeText={props.handleChange('password')}
                             />
         {/* { Platform.OS !=='ios' ? <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} color="#bdbdbd" style={{ marginRight: 10 }} onPress={() => this.showPassword()}/> : <View/> } */}
                         </Item>
              {props.touched.password && props.errors.password ? (
                <Text style={styles.error} >{props.errors.password}</Text>
              ) : null}
              </View>
              {/* <View style={{padding:10}}>
                        <TouchableOpacity
                         onPress={() => {
                          navigation.navigate('ChangeLanguage', {fromLogin: true,selectLanguage:this.selectLanguage.bind(this)})
                        }} style={{ position: 'absolute', marginTop: Platform.OS != 'web' ? 30 : 10,padding:Platform.OS != 'web' ? 0 : 10, zIndex: 3, height: 40, width: '100%'}}></TouchableOpacity>
                      <Item style={[styles.inputStyle]}>
                        <MaterialIcons name="translate" size={20} color={"#C0C0C0"} style={styles.icon}/>
                        <Input
                            disabled
                            onChangeText={this.onchangeLangauge(props)}      
                            onBlur={props.handleBlur('language')}
                            style={styles.inputText}
                            value={props.values.language}
                            placeholder={t('Actn_sheetChange_Language')}
                            placeholderTextColor='#bdbdbd'
                            // keyboardType="default"  
                        />
                      </Item>
              {props.touched.language && props.errors.language && props.values.language=='' ? (
                <Text style={styles.error} >{props.errors.language}</Text>
              ) : null}
              </View> */}
              <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
              <View>
          <TouchableOpacity
                      // onPress={() => { setTimeout(() => { this.forgotPassword() }, 0) } }
                      style={{paddingVertical: 20}}
                      >
                         {/* <Button transparent info> */}
                             <RcText style={[styles.buttonText, {color: backgroundColor}]}>{t('LoginACSFrgtPwd')}</RcText>
                         {/* </Button> */}
                     </TouchableOpacity>
                  </View>
              <Button
                style={{justifyContent:'flex-end',padding:10,borderRadius:10,backgroundColor:backgroundColor}}
                // onPress={() => { setTimeout(() => { this.onSubmit() }, 0) }}
                onPress={props.handleSubmit}
                // onLongPress={() => { 
                //   // testData();
                //   // getWeight();
                //   this.setState({
                //     loading: true
                //   })
                //   // saveHealthkitData();
                // }}
                // loading={props.isSubmitting}
                // disabled={props.isSubmitting}
                >
              <Text style={{ color: 'white' }}>{t('LoginACSLogin')}</Text>
              {/* <MaterialIcons style={{ paddingRight: 10}} name='arrow-forward' size={25} color="#fff"/> */}
              </Button>
              </View>
              </View>
          )}}
        </Formik>
        </FadeInView>}
        </View>
        </View>
                    );

    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',

  },
  contentContainer: {
      paddingTop: 10,
  },
  error: {
    color: 'red'
  },

  text: {
      fontSize: 15, lineHeight: 23, padding: 10
  },
});

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0


  React.useEffect(() => {
    
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default createForm()(Login);
