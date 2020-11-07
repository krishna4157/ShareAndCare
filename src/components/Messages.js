import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Content } from "native-base";
// import PushNotifications from '../constants/PushNotifications';
import { buildMessage } from '../utils/pushNotificationUtils';
import { NavigationEvents } from 'react-navigation';
import { screensEnabled } from 'react-native-screens';
import { backgroundColor } from '../containers/NavigationScreens';
const { height } = Dimensions.get('window');
class Messages extends Component {
    state = {
        
     }




    render() {
        const { selectedLanguage, pushNotifications, screenProps: { t }, loading } = this.props;
       return (
        <View style={{ flex: 1,
            justifyContent: "center",
           }}>

{loading && 
          <View style={{flex:1,position:'absolute',alignItems:'center',alignSelf:'center',zIndex:10}}>
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        }
        <Content padder contentContainerStyle={{flex:1,justifyContent:'center', alignContent:'center'}}>

        {pushNotifications.length > 0 ? 
        <ScrollView
          style={{ flex: 1 }}
        >
          <View >
          {pushNotifications.map(pn => 
                buildMessage(pn, selectedLanguage))
                }
           </View>
        </ScrollView>
        :
        !loading && pushNotifications.length === 0 && 
        <View style={{flex:1, justifyContent:'center'}}>
        <Text style={[styles.noDataText,  {padding:10}]}>{t('NOMSG')}</Text>
    </View>}
    </Content>
    </View>
       )
    }
}

export default Messages;

export const styles=StyleSheet.create({
    noDataText: {
        color: '#546e7a', fontFamily: 'Raleway', fontSize: 14,
        alignSelf:'center',
        justifyContent:'center',
        // alignItems:'center',
       
    },
})