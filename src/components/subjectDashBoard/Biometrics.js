import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialIcons,Entypo, MaterialCommunityIcons,Feather, FontAwesome ,FontAwesome5,Fontisto} from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert,Platform } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import { ProgressCircle } from "react-native-svg-charts";
import _ from 'lodash'
import Constants from 'expo-constants';
import BiometricsPage from '../../containers/BiometricsPage';
import { t } from 'i18n-js';


class Biometrics extends Component {
  state = {};


  captalize=(name)=>{
    return _.startCase(name);
  }

  

  render() {
    const{BiometricsData, screenProps: {t}}=this.props;
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
            justifyContent: "space-evenly",
            backgroundColor:'white'
          }}
        >
          <View style={{ flex: 2, padding: 5, borderRadius: 10,width:'100%' }}>
        <View>
         
           </View>
           <View style={{padding:20,justifyContent:'center',paddingTop:15}}>
             <View>
        <Text style={{fontSize:70,textAlign:'center',color:'#00e676',fontFamily: 'Work_Sans'}}>{Math.round(BiometricsData.bmi)}<Text style={{fontSize:20}}> kg/m²</Text></Text>

             <Text style={{fontSize:16,color:'black',textAlign:'center',fontFamily: 'Raleway'}}>BMI </Text>
             <Text style={{fontSize:16,color:'black',textAlign:'center',fontFamily: 'Raleway'}}>({t('bmi')})</Text>
             </View>
             </View>
           
          </View>
          <View style={{ flex: 2, borderRadius: 10,flexDirection:'column',justifyContent:'space-between' }}>
           <View style={{flexDirection:'row',justifyContent:'space-between',height:'100%'}}>
            <View style={{width:'50%',backgroundColor:'white',borderRadius:10,justifyContent:'center'}}>
            
           <View style={{paddingTop:15}}>
             <Text style={{fontSize:35,textAlign:'center',padding:10,color:'#00b0ff',fontFamily: 'Work_Sans'}}>{Math.round(BiometricsData.height)} <Text style={{fontWeight:'normal',fontSize:18}}>cms</Text></Text>
             <Text style={{fontSize:16,color:'black',paddingLeft:'28%',fontFamily: 'Raleway'}}>{t('Height')}</Text>
             </View>
              </View>
              <View style={{justifyContent:'center',width:'49%',backgroundColor:'white',borderRadius:10}}>
              <View>
          
           </View>
           <View style={{paddingTop:15}}>
           <Text style={{fontSize:35,textAlign:'center',padding:10,color:'#00e5ff',fontFamily: 'Work_Sans'}}>{Math.round(BiometricsData.weight)} <Text style={{fontWeight:'normal',fontSize:18}}>kg</Text></Text>
             <Text style={{fontSize:16,color:'black',paddingLeft:'28%',fontFamily: 'Raleway'}}>{t('Weight')}</Text>
             </View>
              </View>
              </View>
           
          </View>
          <View style={{flex:1.5,flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
        <Text style={{textAlign:'center',fontSize:35,paddingTop:20,color:'#ffc400',fontFamily: 'Work_Sans'}}>{Math.round(BiometricsData.leanBodyMass)} <Text style={{fontWeight:'normal',fontSize:18}}>kg</Text></Text>
            <Text style={{fontSize:16,textAlign:'center',color:'black',paddingLeft:'12%',fontFamily: 'Raleway'}}>{t('LeanBodyMass')}</Text>
              </View>
              <View style={{borderRadius:10,paddingLeft:'17%',marginRight:'50%'}}>
              <Text style={{fontSize:35,paddingTop:20,color:'#ff9100',fontFamily: 'Work_Sans'}}>{Math.round(BiometricsData.bodyFat)} <Text style={{fontSize:18}}>%</Text></Text>
              <Text style={{fontSize:16,color:'black',fontFamily: 'Raleway'}}>{t('BodyFat')}</Text>
                </View>
            </View>
            <View style={{width:'38%',borderRadius:10}}>
        <Text style={{textAlign:'right',fontSize:35,paddingTop:10,color:'#ff8a65',fontFamily: 'Work_Sans'}}>{this.captalize(BiometricsData.sex)}</Text>
                <Text style={{fontSize:16,paddingBottom:15,textAlign:'center',color:'black',fontFamily: 'Raleway'}}>{t('Sex')}</Text>
                </View>
        </View>
      </Container>
    );
  }
}

export default Biometrics;

