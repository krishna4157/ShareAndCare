import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

class Activity extends Component {
  state = {};

  roundValueTo2Decimals = (value) => Math.round(value * 100)/100;

  renderIcon=()=>{
      const {iconName,size, iconColor}=this.props;
      if(iconName=='walking'){
          return <FontAwesome5 name={iconName} size={size} color={iconColor}/>
      } else if(iconName =='shoe-prints'){
        return <FontAwesome5 name={iconName} size={size} color={iconColor} style={{transform:[{rotateZ:'270deg'}]}}/>
      }
        else if(iconName=='bed'){
        return <FontAwesome name={iconName} color={iconColor} size={size} />
      } else{
            return <MaterialCommunityIcons name={iconName} color={iconColor} size={size}/>
      }

  }
  render() {
      const {progress,progressColor,iconName, iconColor, size,value,units,isTextPresent, backgroundColor, progressBackgroundColor}=this.props;
    return (
            <ProgressCircle
                  strokeWidth={10}
                  style={{ height:100, width: 80 }}
                  progress={progress}
                  progressColor={progressColor}
                  backgroundColor={progressBackgroundColor}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                      {this.renderIcon()}
                  </View>
                </ProgressCircle>
    );
  }
}


export default Activity;
