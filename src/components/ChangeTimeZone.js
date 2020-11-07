import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Input,
  View,
} from 'native-base';
import { StyleSheet, StatusBar} from 'react-native';
import styles from './sideBar/styles';
import {localeStore} from '../utils/localization/localizationUtils';
import { Formik } from 'formik';
import * as Yup from 'yup';
// 
class ChangeTimeZone extends Component {
  state = {
    input : ''
  };


  checkDataPresent =() =>{ 
    const {timeZones }= this.props; 
    const  {input} = this.state;

    var checkData = timeZones.map((data) => {
      if(_.includes(data.timeZoneName,input)){
        return true;
      } else {
        return false;
      }
    });
    
    if(!checkData.includes(true)){
      return false;
    } else {
      return true;
    }
  }

  
  render () {
    const {navigation,setTimeZone, changeLanguage,timeZones, selectedLang, screenProps,screenProps:{t}} = this.props;
    const { setLocale } = screenProps;
    const fromLogin = navigation.getParam('fromLogin');
    const  { input } = this.state;
  
    return (
      <Container style={{ flex:1,marginTop: fromLogin ? 0 : 0,flexDirection:'column'}}>
        <View>
        <Input onChangeText={(value)=>{
 this.setState({
   input: value
 })         
         }} autoFocus style={{padding:10,marginleft:10,borderWidth:1,borderRadius:2,borderColor:'grey'}} />
          </View>
        <Content style={{backgroundColor: '#FFFFFF' }}>
        
         
          <List style={{marginTop:20}}>
            {timeZones.map((data) => 
            data.timeZoneName.includes(input) &&
            <ListItem
              selected={ selectedLang === data.value ? true : false }
              style={{ height: 60 }}
              onPress={() => {
                setTimeout(() => {
                //   changeLanguage(data.value, setLocale)
                  setTimeZone(data.timeZoneName);
                  navigation.goBack()
                }, 0);
              }}
            >
              <Text style={styles.text}>{data.timeZoneName}</Text>
            </ListItem>)}
          </List>
          {!this.checkDataPresent() && 
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',height:'100%'}}>
          <Text style={{textAlign:'center',alignSelf:'center'}}>No Data Present</Text>
          </View>}
        </Content>
        
      </Container>
    )
}
}

export default ChangeTimeZone;
