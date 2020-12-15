import React, { useRef, useEffect } from 'react';
import { View, Keyboard, Image,TextInput, Text as RcText, Dimensions, StatusBar, Platform, TouchableOpacity, ActivityIndicator,Animated, KeyboardAvoidingView } from 'react-native';
import { Input, Item, Button,Text, Icon, Card, CardItem, Body } from 'native-base';
import { createForm } from 'rc-form';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomPicker } from 'react-native-custom-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneNumberInput from './PhoneNoInput';
import { SocialIcon } from 'react-native-elements';

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
// import { validateLoginDetails } from '../utils/loginUtils';
import { backgroundColor } from '../containers/NavigationScreens';
import logo from '../assets/images/butterfly.gif';
import success from '../assets/images/success.gif';
import error from '../assets/images/error.png';

import { NavigationEvents } from 'react-navigation';
// import CustomToast from './CustomToast'; 
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
// import { changeLanguage } from '../actions/changeLanguage';
import { Formik, ErrorMessage } from 'formik';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import * as Yup from 'yup';
// import { encrypt } from '../utils/cryptoUtil';
import moment from 'moment';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
// import PhoneNoInput from './PhoneNoInput';
// import PhNumberInput from './PhNumberInput';
import axios from 'axios';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native-web';
import PhNumberInput from './PhNumberInput';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';
import api from '../utils/api';

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')


class FirstAppTour extends React.Component {

  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.state = {
      startValue: new Animated.Value(0),
      ButtonStartValue: new Animated.Value(-360),
      moveLeftValue: new Animated.Value(0),
      moveRightValue: new Animated.Value(360),
      endValue: 30,
      buttonEndValue: -5,

      endMoveValue: 300,
      duration: 3000,
      isVisible: false,
      isSuccess: 0,
      isPasswordVisible: false,
      statusColor: 'yellow'
    };
  }

  componentDidMount() {
    
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.ButtonStartValue, {
      toValue: this.state.buttonEndValue,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      this.setState({
        isVisible: true
      })
    }, 500);
  }


  getCorrectPassword = async(data) => {
    const {navigation}= this.props;
    try {
    this.setState({
      statusColor: 'blue'
    });
    this.StartBackgroundColorAnimation();
    // Animated.timing(this.state.moveLeftValue, {
    //   toValue: 360,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();

    
    Animated.timing(this.state.moveLeftValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.moveRightValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(this.state.moveRightValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    
      this.setState({
        isSuccess: 1
      })
    }, 5000);
    setTimeout(() => {
      showToast('Login Successfully', 'success', 3000);  
      // navigation.navigate("NextScreenWithData",{'BackendData' : data})
      // Introduction
      navigation.navigate("Introduction");
    }, 6000);
  } catch(e){
    this.getWrongPassword()
  }

  }


  getWrongPassword = () => {
    this.setState({
      statusColor: 'blue'
    });
    this.setState({
      isSuccess: 0
    });
    this.StartBackgroundColorAnimation();
    // Animated.timing(this.state.moveLeftValue, {
    //   toValue: 360,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();

    
    Animated.timing(this.state.moveLeftValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.moveRightValue, {
      toValue: 360,
      duration: 500,
      useNativeDriver: false,
    }).start();


    setTimeout(() => {
      Animated.timing(this.state.moveLeftValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(this.state.moveRightValue, {
        toValue: 360,
        duration: 500,
        useNativeDriver: false,
      }).start();
    
      this.setState({
        isSuccess: 0.5
        
      })
      showToast('Failed to login', 'danger', 3000);

    }, 5000);

    setTimeout(() => {
    
      this.setState({
        isSuccess:2
      })
    }, 10000);
    


  }


  onSubmit = (values) => {
    alert(JSON.stringify(values));
  }

  StartBackgroundColorAnimation = () =>
    {
        this.Animation.setValue(0);

        Animated.timing(
            this.Animation,
            {
                toValue: 1,
                duration: 5000,
                useNativeDriver: false,
            }
        ).start(() => { this.StartBackgroundColorAnimation() });
    }

  //   forgotPassword = () => {
  //     // const { navigation } = this.props;
  //     // navigation.navigate('UserValidation');
  //   //   navigation.navigate('ResetPassword');
  // }
    
  checkValues = async (values) => {
    try {
      const user  = {
        phoneNo : values.phoneNo,
        loginPassword: values.password 
      };
      const res = await api.post("http://localhost:8080/login",user);
      console.log(res.data);
      this.getCorrectPassword(res.data);
    
    } catch(e) {
      this.getWrongPassword();
    }
  }
    
      
    render(){
        const { image, subject, errorMessage, showPassword,language,languageSelected, callingCode, modalVisible,isPasswordVisible } = this.state;
        const {  navigation, screenProps, deviceLocation } = this.props;
        const { t } = screenProps;
        const  { isVisible,statusColor,isSuccess } =this.state;
      // alert(callingCode);
      const BackgroundColorConfig = this.Animation.interpolate(
        {
            inputRange: [ 0, 0.2, 0.4, 0.8, 1 ],
            
            outputRange: [ 'white', '#CDDC39', '#03A9F4', '#FFEB3B', 'white' ],

        });


        const SuccessBackgroundColor = this.Animation.interpolate(
          {
              inputRange: [ 0,0.5, 1 ],
              
              outputRange: [ '#009688', 'green','#009688'],
  
          });

          const FailureBackgroundColor = this.Animation.interpolate(
            {
                inputRange: [ 0,0.5, 1 ],
                
                outputRange: [ 'white', 'red', 'white',],
    
            });



      return (
       
            <View style={{flex:1,backgroundColor:'black'}}>
            <Animated.View style={{flex:1,backgroundColor:'red',borderRadius:10,transform: [
                {
                  translateX: this.state.ButtonStartValue,   
                },
              ]}}>
            
                <Text style={{fontSize:80,color:'white',textAlign:'center'}}>HELLO</Text>
              </Animated.View>
              <View style={{flex:6,marginTop:'30%'}}>
              <FadeInView>
                  <Text style={{textAlign:'center',fontSize:25,color:'white'}}>
                      WELCOME TO SHARE AND CARE
                      </Text>
              <Image
    source={logo}
    style={{height:SCREEN_HEIGHT/1.5,width:'100%',alignSelf:'center',overflow:'hidden'}}
  />
              </FadeInView>
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
    color: 'red',
    fontSize: 10,
  },
  left : {
    paddingLeft:10
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
        duration: 1000,
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

export default FirstAppTour;
