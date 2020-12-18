import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import React, {Component, useContext, useState, useEffect} from 'react';
import wrong from '../assets/images/wrong1.gif';
import tick from '../assets/images/tick.gif';

import { Image } from "react-native";

export default (internalState,type) => {

return (<View style={{ flex:1,borderLeftColor:getColorByType(type),borderLeftWidth:4,elevation:5,shadowColor:'grey',flexDirection:'row',paddingVertical:20, width: '90%', backgroundColor: 'white',margin:0,borderRadius:10 }}> 
    <View style={{flex:0.5,flexWrap:'wrap',alignSelf:'center',marginLeft:10}}>
    {type=='error' && <Image
    source={wrong}
    style={{height:20,width:20,marginLeft:0,alignSelf:'center',overflow:'hidden'}}
  />}
    {type=='success' && <Image
    source={tick}
    style={{height:30,width:30,marginLeft:-10,alignSelf:'center',overflow:'hidden'}}
  />}
    {type=='info' && <Feather name="info" size={24} color="#c7eafd" />}
    </View>
    <View style={{flex:5,flexShrink: 1,flexWrap:'wrap',alignSelf:'center',marginLeft:10,alignItems:'flex-start'}}>
    <Text style={{fontWeight:'bold',flexShrink:1,fontSize:14,flexWrap: 'wrap'}}>{internalState.text1}
    </Text >
    </View>
    <View style={{flex:0.5,flexWrap:'wrap',alignSelf:'center',marginLeft:15,alignItems:'flex-start'}}>
    <Feather name="x" size={20} color="grey" />
    </View>
  </View>);
}

export const getColorByType = (type) => {
    switch (type) {
        case 'error':
            return "#cd5050";
        case 'success':
            return "#51d077";
        case 'info':
            return "#c7eafd";       
    }
}





