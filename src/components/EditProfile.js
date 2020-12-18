// import { changeLanguage } from '../actions/changeLanguage';
import { Formik } from 'formik';
import { Button, Input, Item, Text } from 'native-base';
import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-web';
import { NavigationEvents } from 'react-navigation';
import * as Yup from 'yup';
import { validatePhoneNumber } from '../utils/phoneNumberValidation';
// import { fetchBodyTemperature, fetchLatestWeight, getWeight, testData } from '../utils/healthKit/Healthkit';
// import { saveHealthkitData } from '../actions/healthkit';
import showToast from '../utils/toast';
import PhNumberInput from './PhNumberInput';




class EditProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    this.state = {
      startValue: new Animated.Value(0),
      ButtonStartValue: new Animated.Value(-180),
      moveLeftValue: new Animated.Value(0),
      moveRightValue: new Animated.Value(360),
      endValue: 30,
      buttonEndValue: -5,
      newValue: '',
      height: 90,
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

  updateSize = (height) => {
    this.setState({
      height
    });
  }


  getCorrectPassword = () => {
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
    }, 6000);
    

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
    
    
      
    render(){
        const { image, subject, errorMessage, showPassword,language,languageSelected, callingCode, modalVisible,isPasswordVisible } = this.state;
        const { loading, navigation, screenProps,currentScreen, deviceLocation } = this.props;
        const { t } = screenProps;
        const  { isVisible,statusColor,isSuccess } =this.state;

        const {newValue, height} = this.state;

    let newStyle = {
      height
    }
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
        <Formik
        initialValues={{ phoneNo: '', password: '' ,confirmPassword: ''
        // language: ''
      }}
        validationSchema={Yup.object({
          phoneNo: Yup.string()
          .test("len", "Must be a valid Phone Number.", val => {
              return validatePhoneNumber(val);
             })
             .required(t('USRNAMEWARNING')),
          password: Yup.string()
            .required(t('PWDWARNING')),
            confirmPassword: Yup.string()
            .required(t('PWDWARNING')),

            // language: Yup.string()
            // .required(t('LanguageValidate'))
        })}
        onSubmit={(values, formikActions) => {
          setTimeout(() => {
            // console.log(JSON.stringify(values));
            if(values.password=='Asdx#123'){
              this.getCorrectPassword();
            } else 
            {
              this.getWrongPassword();
            }
            // Alert.alert(JSON.stringify(values));
            //  this.onSubmit(values);
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

            // <KeyboardAvoidingView>
            <View style={{flex:1,height:'100%',justifyContent:'center'}}>
                  <NavigationEvents
                //  onWillFocus={() => {
                //      this.resetCredentials();
                //    }}
               />
               
                   <Animated.View 
        style={{
          flex:1,
          borderBottomRightRadius:this.state.moveRightValue,
          borderBottomLeftRadius:this.state.moveLeftValue,
          backgroundColor: isSuccess == 0.5 ? FailureBackgroundColor : isSuccess ==1 ? SuccessBackgroundColor : isSuccess>1 ? 'white' :BackgroundColorConfig
        }}>
          <Button style={{marginTop:40,borderTopRightRadius:30,borderBottomRightRadius:30,backgroundColor:'#c90400'}} onPress={()=>{
                   navigation.goBack();
               }}>
                   <Text>     Back        </Text>
                   </Button>
                   <View style={{marginTop:15}}>
                   <Text style={{justifyContent:'center',textAlign:'center',fontSize:40,fontFamily:'RalewayBold'}}>Edit Profile</Text>
                    </View>

          </Animated.View>
      <Animated.View style={{flex:3,
      padding:10
      ,transform: [
                {
                  translateY: this.state.startValue,
                  
                },
              ],}}>
             {isVisible && <FadeInView>
              <ScrollView>
            

            <View>
                    <PhNumberInput 
                    // deviceLocation={deviceLocation}
                    callingCode={callingCode}
                     t={t} getPhoneValue={getPhoneValue}  />
                          {/* <Text>{props.values.phoneNo}</Text> */}
            {props.touched.phoneNo && props.errors.phoneNo ? (
              <Text 
              style={{color: 'red',
              fontSize: 10,paddingLeft:10,marginTop:-10}}
               >{props.errors.phoneNo}</Text>
            ) : null}
            </View>

            <View style={{padding:10}}>
                <Text style={{fontSize:20}}>First Name</Text>
            <Item style={[styles.inputStyle]}>
                           <Input 
                           keyboardType="default"
                           value = {props.values.password}
                          //  value={subject.password} 
                           placeholder={t('LoginACSPwd')} 
                           placeholderTextColor='#bdbdbd' 
                           secureTextEntry={isPasswordVisible ? false : true} 
                           style={{outlineWidth: 0}} 
                           onChangeText={props.handleChange('password')}
                           />
                            
    
       {/* { Platform.OS !=='ios' ? <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} color="#bdbdbd" style={{ marginRight: 10 }} onPress={() => this.showPassword()}/> : <View/> } */}
                       </Item>
            {props.touched.password && props.errors.password ? (
              <Text  style={{color: 'red',
              fontSize: 10}} >{props.errors.password}</Text>
            ) : null}
           
            </View>

            <View style={{padding:10}}>
                <Text style={{fontSize:20}}>Last Name</Text>
            <Item style={[styles.inputStyle]}>
                           <Input 
                           keyboardType="default"
                           value = {props.values.password}
                          //  value={subject.password} 
                           placeholder={'Last Name'} 
                           placeholderTextColor='#bdbdbd' 
                           secureTextEntry={isPasswordVisible ? false : true} 
                           style={{outlineWidth: 0}} 
                           onChangeText={props.handleChange('password')}
                           />
                            
    
       {/* { Platform.OS !=='ios' ? <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} color="#bdbdbd" style={{ marginRight: 10 }} onPress={() => this.showPassword()}/> : <View/> } */}
                       </Item>
            {props.touched.password && props.errors.password ? (
              <Text  style={{color: 'red',
              fontSize: 10}} >{props.errors.password}</Text>
            ) : null}
           
            </View>

            <View style={{padding:10}}>
                <Text style={{fontSize:20}}>Address</Text>
            <Item style={[styles.inputStyle]}>
                           <Input 
                           keyboardType="default"
                           value = {props.values.password}
                          //  value={subject.password} 
                           placeholder={'Address'} 
                           placeholderTextColor='#bdbdbd' 
                           secureTextEntry={isPasswordVisible ? false : true} 
                           style={[newStyle],{padding:10}}                           
                           onChangeText={props.handleChange('password')}
                           editable={true}
  multiline={true}
//   value={value}
  onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                           />
                            
    
       {/* { Platform.OS !=='ios' ? <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} color="#bdbdbd" style={{ marginRight: 10 }} onPress={() => this.showPassword()}/> : <View/> } */}
                       </Item>
            {props.touched.password && props.errors.password ? (
              <Text  style={{color: 'red',
              fontSize: 10}} >{props.errors.password}</Text>
            ) : null}
           
            </View>


            
            {/* </View> */}
            
            
            <View style={{flexDirection:'column',marginTop:-20}}>
            <View style={{marginLeft:-30,marginBottom:10,width:'120%',flexDirection:'row',justifyContent:'space-between',}}>
            <Animated.View style={{transform: [
                {
                  translateX: this.state.ButtonStartValue,
                  
                },
              ]}}>
            
              </Animated.View>
              <View style={{marginBottom:20}}>
            <Button
            onPress={props.handleSubmit}
            style={{borderRadius:30,marginTop:90,backgroundColor:'#26abff'}}
            >
              <Text>      UPDATE                 </Text>
              </Button>
              </View>
              </View>
              
              {/* <Text style={{justifyContent:'center',textAlign:'center'}}>OR</Text>
              <SocialIcon
            button={true}          
            title='Sign In With Facebook'
            iconSize={15}
            type='facebook'
            />
            <SocialIcon
            iconSize={15}
            title={"Sign In With Google"}
            button={true}
            type={"google"}
            /> */}
            </View>
            </ScrollView>
            </FadeInView>}
            </Animated.View>
            

            </View>
            // </KeyboardAvoidingView>
        )}}
      </Formik>
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

export default EditProfileScreen;


// editable={true}
//   multiline={true}
//   value={value}
//   onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}