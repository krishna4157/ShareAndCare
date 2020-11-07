import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions
} from "react-native";
import {
  Header,
  Title,
  Left,
  Body,
  ListItem,
  Right,
  List,
  Item,
  Input
} from "native-base";
import moment from "moment-timezone";
import SelectTimeZone from "./SelectTimeZone";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import { localeStore } from "../../utils/localization/localizationUtils";
import { backgroundColor } from '../../containers/NavigationScreens';
import { styles } from './../../components/styles/loginStyles';
import { Formik } from "formik";
import * as Yup from 'yup';
import { NavigationEvents } from "react-navigation";
const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export default class TimeZone extends Component {
  

  state = {
    modalVisible: false,
    timeZone : ''
  };


  handleModalVisibility = () => {
    this.setState(prevState => ({
      ...prevState,
      modalVisible: !prevState.modalVisible
    }));
  };

  render() {
    const { changeTimeZone,fromLogin, loading, selectedTimeZone, getTimeZoneList, timeZones, submitTimeZone, data, screenProps } = this.props;
    const { t } = screenProps;
    return (
    <Formik
  initialValues={{ timeZone: selectedTimeZone || moment.tz.guess(true) }}
  validationSchema={Yup.object({
      timeZone: Yup.string().required(t('SelTimezone'))
  })}
  onSubmit={(values, formikActions) => {
    setTimeout(() => {
      // changeTimeZone(values.timeZone);
      submitTimeZone(values.timeZone);
      formikActions.setSubmitting(false);
    }, 500);
  }}>
  {props =>{
     const {
       setFieldValue,setValues
    } = props;
    const setTimeZone=(timeZone)=>{
      setFieldValue(
            'timeZone',timeZone)
    }
    return (
      <View style={{flex:1}}>
        {loading &&
        <View style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH,position:'absolute',alignSelf:'center',justifyContent:'center'}}> 
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        } 
        <View style={{padding:10}}>
                        <Text style={{fontSize:18}}>Select Timezone</Text>
                        <TouchableOpacity
                         onPress={() => {
                          this.props.navigation.navigate('ChangeTimeZone', {fromLogin: fromLogin,timeZones: timeZones,setTimeZone: setTimeZone})
                        }} style={{ position: 'absolute', marginTop:30, zIndex: 3, height: 40, width: '100%'}}></TouchableOpacity>
                      <Item style={[styles.inputStyle]}>
                        <Input
                            disabled
                            style={styles.inputText}
                            value={props.values.timeZone}
                            placeholder={t('SelTimezone')}
                            placeholderTextColor='#bdbdbd'
                        />
                      </Item>
                      {props.values.timeZone =='' && props.touched.timeZone && props.errors.timeZone && 
         <Text style={styles.error} >{props.errors.timeZone}</Text> 
        }
                      <TouchableOpacity
          onPress={props.handleSubmit}
          style={{alignSelf: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#0d47a1",
              marginTop: 30,
              width: 100,
              // marginLeft: 120,
              borderRadius:5}}
        >
          <Text style={{color: "#fff", alignItems: "center"}}>{t('Save')}</Text>
        </TouchableOpacity>
              </View>
        
      </View>
    );
  }}
  </Formik>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     justifyContent: "center"
//   },
//   cardItem: {
//     justifyContent: "center",
//     // backgroundColor: '#DDDDDD',
//     padding: 10
//   },
//   button: {
//     alignSelf: "center",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#0d47a1",
//     marginTop: 30,
//     width: 100,
//     // marginLeft: 120,
//     borderRadius:5
//   },
//   buttonText: {
//     color: "#fff",
//     alignItems: "center"
//   }
// });
}