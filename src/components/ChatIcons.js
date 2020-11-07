import React, { Component } from "react";
import { View, Badge, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export class ChatIcons extends Component {
    render(){
        const {unreadChats,tintColor,focused} = this.props;

        return (
            <View style={{flexDirection:'row'}}>
                {focused ? 
                    <MaterialCommunityIcons name="chat" size={26} color={tintColor} />
                    : 
                    <MaterialCommunityIcons name="chat-outline" size={26} color={tintColor} /> 
                }
                {unreadChats!= 0 || unreadChats!= undefined && 
                    <Badge style={{scaleX:0.6,scaleY:0.6,marginLeft:-15}}>
                        <Text style={{fontSize:17}}>{unreadChats}</Text>
                    </Badge>
                }
            </View>        
        );
    }
}
