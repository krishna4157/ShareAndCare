import React,{Component} from 'react';
import { View, Card, CardItem, Text, Body } from "native-base";
import { MaterialCommunityIcons, FontAwesome, Entypo,Foundation } from '@expo/vector-icons';
import moment from 'moment-timezone';
// import Timeline from 'react-native-timeline-listview';
import Timeline from 'react-native-timeline-flatlist'; 
import { Dimensions } from 'react-native'
import styles from '../components/styles/TimelineStyles';

export default class  PhoneCallCard extends Component {
render(){
    const { call, timeZone } = this.props;
    return (
<Card style={{flex:1,borderRadius:10}}>
<View style={{flexDirection:'row',backgroundColor:'white',borderRadius:10 }}>
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center',borderRadius:10,padding:5}}>
    {call.callType === 'VIDEO' ? <FontAwesome name="video-camera" style={{alignSelf:'center',marginLeft:10}} color={'#0080FF'} size={20}/>
    : <Foundation name="telephone" style={{alignSelf:'center',marginLeft:10}} color={'#0080FF'} size={30}/>}
</View>
<View style={{textAlign:'left',flex:5,backgroundColor:'#0080FF',padding:5,paddingVertical:10,borderTopRightRadius:10,borderBottomRightRadius:10}}>
<Text style={{color:'white',paddingLeft:10,fontSize:14.5, paddingBottom: 5}}>{call.title}</Text>
    <Text style={{color:'white',fontSize:11.5,paddingLeft:10}}>{moment(call.date).format("DD-MMM-YYYY")} {call.time} {moment(call.date).tz(timeZone).format('z')} </Text>
    <Text style={{color:'white',fontSize:11.5,paddingLeft:10}}>Duration: {Math.floor(call.duration/60) == 0 ? '' : `${Math.floor(call.duration/60)} ${call.duration>119 ? 'hrs' : 'hr' } `} {call.duration%60 == 0 ? '' : `${call.duration%60} ${call.duration%60 == 1 ? 'min' : 'mins'}`} </Text>
</View>
</View>
</Card>
)
}
}