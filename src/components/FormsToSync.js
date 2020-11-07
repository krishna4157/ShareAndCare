import { render } from "react-dom"
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet,Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SyncImage from '../../assets/SyncImage.png';
export default class FormsToSync extends Component {
     render(){

        // const {screenProps}= this.props;
        const {isConnected,syncing,NoOfFormsToSync,t,loading,stopSyncing,OfflineFormsToSync,SyncCompleted,} =this.props;
        return (
    <View style={{flexDirection:'row',justifyContent:'center'}}>
        {isConnected==false && <View style={{marginTop:5}}>
            {/* <Text style={{zIndex:5,fontWeight:'bold',color:'black',backgroundColor:'red',borderRadius:50,padding:5,fontSize:8}}>{OfflineFormsToSync}</Text> */}
            <View style={{backgroundColor:'red', borderRadius: 30, position:'absolute',zIndex:3}}>
            <Text style={{marginLeft:2,fontSize:11,color:'white',paddingHorizontal:7,paddingVertical:2,marginTop:1,borderRadius:30}}>{OfflineFormsToSync}</Text>
            </View>

            <Image 
                source={SyncImage}  
                style={{width: 50, height: 50 }}
            />
            </View>}
{!loading == true &&<View style={{justifyContent:'center'}}>
        {OfflineFormsToSync >= 0 && <Text style={{textAlign:'center'}}>{OfflineFormsToSync} {t('formsToSync')}</Text>}
             {/* {/* {isConnected==false && OfflineFormsToSync==0 && <Text style={{textAlign:'center'}}>There are no forms to Sync</Text>} */}
             </View>}
             </View>)
            
             
            }
            
}