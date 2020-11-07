import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from 'lodash';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  FontAwesome5
} from "@expo/vector-icons";
import {
  Container,
  Header,
  View,
  Button,
  Title,
  Content,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Card
} from "native-base";
import {
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  Platform,
  ScrollView
} from "react-native";

import { NavigationEvents } from "react-navigation";
import { ProgressCircle } from "react-native-svg-charts";
import * as shape from "d3-shape";
import Constants from "expo-constants";
import Activity from "./Activity";
import moment from 'moment'
import tzmoment from 'moment-timezone';
import { timeDifference } from '../../utils/timeUtil';
import { activities } from './goalConstants';
import { t } from "i18n-js";
class ActivityDetails extends Component {
  state = {};


  goalStatus(value,goal){
   var temp = value/goal
   var result = temp.toFixed(1);
   return result; 
  }


  render() {
    const {ActivityData,GoalData,lastSync, screenProps: {t}}= this.props;
    const currentTimezone = tzmoment.tz.guess(true);
    let updatedTs = ActivityData.updatedTs;
    if(updatedTs != null && !updatedTs.includes('+')) {
      updatedTs = updatedTs + '.000+0000';
    }
    let updatedTime = updatedTs ? tzmoment.tz(updatedTs, currentTimezone) : null;
    // console.log("updatedTsString: ", updatedTime.format().toString());
    // console.log("updatedTime: ", updatedTime);
    // console.log("updateTsFormated: ", moment(updatedTime.format().toString()));
    const currentTime = moment();
    // updatedTime = moment(updatedTime.format().toString());
    // console.log("currentTime: ", currentTime);
    // const diff = currentTime.diff(updatedTime);
    // const diff = currentTime - updatedTime;
    const activitiesToDisplay = _.filter(activities, act => GoalData[act.viewProp]);
    return (
      <Container>
        <NavigationEvents
          onWillFocus={() => {
            // BackHandler.addEventListener('hardwareBackPress',() => false )
          }}
        />
        <ScrollView style={{backgroundColor: "#ffffff"}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            alignItems: "center"
          }}
        >
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 30,
              borderColor: "white",
              backgroundColor: "#e0e0e0"
            }}
          >
            <Text style={{ color: "grey",fontFamily: 'Work_Sans' }}>
          <Text style={{ fontWeight: "bold",fontFamily: 'Raleway' }}>{t('HomeToday')}</Text><Text style={{fontFamily: 'Work_Sans'}}> {moment().startOf("month").format('MMMM')} {moment().startOf("day").format('DD')}</Text>
            </Text>
          </View>
          <View style={{ paddingLeft: "3%" }}>
          <Text style={{ color: "grey" ,fontSize:12,fontFamily: 'Work_Sans'}}>{t('LastSynced')} {updatedTime === null ? updatedTime : timeDifference(currentTime, updatedTime) }</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,

          }}
        >
             {
              _.map(activitiesToDisplay, (act) => (
                <Card style={{borderRadius:10,flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor: act.backgroundColor }}>
                      {/* <View style={{flex:1}} flexDirection = 'row'> */}
                        <View style={{flex:3.5,alignItems:'flex-start', flexDirection:'column',paddingLeft:20/* , paddingTop: 5 */}}>
                          <Text style={{fontSize:17,fontFamily: 'Raleway',color: act.textColor}}>
                            {t(act.title)}
                          </Text> 
                          <Text style={{fontSize:45,fontFamily:'WorkSansLight',color: act.textColor }}>
                              { act.units === 'DistanceUnits' ? Math.round(ActivityData[act.key] * 100)/100
                              : Math.round(ActivityData[act.key])} 
                            <Text style={{fontSize:14,fontFamily: 'Raleway'}}> {t(act.units)}</Text>
                          </Text>
                        </View>
                        <View style={{flex:2.5, borderTopRightRadius:10, borderBottomRightRadius:10, borderWidth: 0.5, borderColor: act.backgroundColor, alignItems:'center',  justifyContent: 'center'/* ,alignItems:'center' */, backgroundColor: 'white'}}> 
                          <Activity isTextPresent={false} progress={this.goalStatus(ActivityData[act.key],GoalData[act.key])} progressColor={act.progressColor} iconName={act.iconName} size={30} units={act.units} progressBackgroundColor={act.progressBackgroundColor} iconColor={act.iconColor}/>
                        </View>
                    {/* </View> */}
                    </Card>
                  ))
               
            }
        </View>
          </ScrollView>
      </Container>
    );
  }
}


export default ActivityDetails;
