
import React, { Component } from 'react';
import { MaterialIcons,Entypo, MaterialCommunityIcons,Feather, FontAwesome } from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert,Platform, Dimensions } from 'react-native'
import WebModal from 'modal-react-native-web';
import action from './action';
import { backgroundColor } from '../containers/NavigationScreens';
const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

class WebAlert extends Component {

    renderLogoutDialogue = () => {
        const { screenProps, message,t,hideModal,action,headerText } = this.props;
        return (
          <View style={{backgroundColor:'white',borderWidth:1,borderRadius:5,flexDirection:'column',width:'25%',height:'20%',marginTop:SCREEN_HEIGHT/4,justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
         
          <View style={{flex:3,padding:10}}>
          <Text>
            {headerText}
            </Text>
          <Text  style={{alignSelf:'center',padding:10}}>{message}</Text>
          </View>
          <View style={{flex:3,padding:10,marginTop:20}}>
            <View style={{flexDirection:'row-reverse'}} >
            <View style={{paddingLeft:10}}>
            <Button onPress={()=>{action();}} style={{paddingLeft:10,height:30,paddingRight:10,backgroundColor:backgroundColor}} >
              <Text style={{color:'white'}} >{t('YES')}</Text>
              </Button>
              </View>
            <Button onPress={()=>{
              hideModal();
            }} style={{paddingLeft:10,height:30,paddingRight:10,borderWidth:1,borderColor:'red',backgroundColor:'white'}}>
              <Text>{t('NO')}</Text>
              </Button>
          </View>
          </View>
          </View>);
      }
      
    render() {
        return (
            <WebModal style={{width:'95%',
          height:SCREEN_HEIGHT,
          alignContent:'center',
          padding:30 }}
        // onShow={()=>this.refresh()}
          transparent={true}
          animationType="slide"
          visible={true}
        >
         {this.renderLogoutDialogue()}
            </WebModal>
        )
    }

}

export default WebAlert;