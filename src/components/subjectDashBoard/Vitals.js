

import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialIcons,Entypo, MaterialCommunityIcons,Feather, FontAwesome ,FontAwesome5,Fontisto} from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert,Platform } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import { ProgressCircle } from "react-native-svg-charts";
import {
  Card
} from "native-base";
import Constants from 'expo-constants';


class Vitals extends Component {
  state = {};


  render() {
    const{subjectHealthData, screenProps: {t }}=this.props;
    return (
      <Container style={{backgroundColor:'#e0e0e0'}}>
        <NavigationEvents
          onWillFocus={() => {
            // BackHandler.addEventListener('hardwareBackPress',() => false )
          }}
        />
       
        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: "column",
            justifyContent: "space-evenly"
          }}
        >
          <Card transparent style={{ padding: 10, borderRadius: 10,backgroundColor:'white' }}>
        <View>
          <FontAwesome
                  name="heartbeat"
                  size={150}
                  color='#ff5252'
                  style={{alignSelf:'center'}}
                  // style={{ transform: [{ rotateZ: "-69deg" }] }}
                />
           </View>
           <View style={{flexDirection:'row',padding:20,justifyContent:'space-between',paddingTop:15}}>
             <View>
        <Text style={{textAlign:'center',fontFamily: 'Raleway'}}>{t('HeartRate')}</Text>
             <Text style={{fontSize:28,textAlign:'center',fontFamily: 'Work_Sans'}}>{Math.round(subjectHealthData.heartRate)} <Text style={{fontSize:12}}>bpm</Text></Text>
             </View>
             <View>
             <Text style={{textAlign:'center',fontFamily: 'Raleway'}}>{t('BloodPressure')}</Text>
        <Text style={{fontSize:28,textAlign:'center',fontFamily: 'Work_Sans'}}>{Math.round(subjectHealthData.systolicBp)}/{Math.round(subjectHealthData.diastolicBp)} <Text style={{fontSize:12}}>mmHg</Text></Text>
             </View>
             </View>
           
          </Card>
          <View style={{ flex: 3, borderRadius: 10 }}>
           <View style={{flexDirection:'row',justifyContent:'space-between',height:'100%'}}>
            <Card  transparent style={{width:'31%',borderRadius:10,backgroundColor:'white',justifyContent:'center'}}>
            <View>
          <Entypo
                  name="air"
                  size={50}
                  color='#00b8d4'
                  style={{alignSelf:'center'}}
                  // style={{ transform: [{ rotateZ: "-69deg" }] }}
                />
           </View>
           <View style={{paddingTop:15}}>
        <Text style={{textAlign:'center',fontFamily: 'Raleway'}}>{t('RespirationRate')}</Text>
             <Text style={{fontSize:20,textAlign:'center',padding:10,fontFamily: 'Work_Sans'}}>{Math.round(subjectHealthData.respiratoryRate)} per min</Text>
             </View>
              </Card>
              <Card transparent style={{justifyContent:'center',width:'32%',backgroundColor:'white',borderRadius:10}}>
              <View>
          <Entypo
                  name="thermometer"
                  size={50}
                  color='#333F44'
                  style={{alignSelf:'center'}}
                  // style={{ transform: [{ rotateZ: "-69deg" }] }}
                />
           </View>
           <View style={{paddingTop:15}}>
              <Text style={{textAlign:'center',fontFamily: 'Raleway'}}>{t('BodyTemperature')} </Text>
              <Text style={{fontSize:20,textAlign:'center',padding:10,fontFamily: 'Work_Sans'}}>{Math.round(subjectHealthData.bodyTemp)} °C</Text>
             </View>
              </Card>
              <Card transparent style={{justifyContent:'center',width:'30%',backgroundColor:'white',borderRadius:10}}>
              <View>
          <FontAwesome
                  name="bolt"
                  size={50}
                  color='orange'
                  style={{alignSelf:'center'}}
                  // style={{ transform: [{ rotateZ: "-69deg" }] }}
                />
           </View>
           <View style={{paddingTop:15}}>
        <Text style={{textAlign:'center',fontFamily: 'Raleway'}}>{t('BloodGlucose')}</Text>
        <Text style={{fontSize:20,textAlign:'center',padding:10,fontFamily: 'Work_Sans'}}>{Math.round(subjectHealthData.bloodGlucose)} mg/dL</Text>
             </View>
              </Card>
              </View>
           
          </View>
        </View>
      </Container>
    );
  }
}



export default Vitals

