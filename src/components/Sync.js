import { render } from "react-dom"
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet,Image,Animated,Easing} from 'react-native';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
  } from 'react-native-popup-dialog';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Sync extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            spinAnim: new Animated.Value(0),
            showSyncingCompleted: false
         }
      }

    componentDidMount(){
        Animated.loop(Animated.timing(
           this.state.spinAnim,
         {
           toValue: 1,
           duration: 3000,
           easing: Easing.linear,
           useNativeDriver: true
         }
       )).start();
        }
    
    // componentDidUpdate(prevProps) {
    //     const { SyncCompleted } = this.props;
    //     if(prevProps.SyncCompleted !== SyncCompleted && SyncCompleted === true) {
    //         this.displaySyncCompleted();
            
    //     }
    // }

    // displaySyncCompleted = () => {
    //     this.setState({
    //         showSyncingCompleted: true,
    //     })
    //     setTimeout(() => {
    //         this.setState({
    //             showSyncingCompleted: false,
    //         })
    //     }, 4000);
    // }

    render(){
        const spin = this.state.spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          });

        // const {screenProps}= this.props;
        const { showSyncingCompleted, isConnected,syncing,NoOfFormsToSync,
          loading,stopSyncing,OfflineFormsToSync,SyncCompleted, screenProps: { t }} =this.props;
        // const { showSyncingCompleted } = this.state;
        return (
        <View style={{flex:1, height:'90%',width:'100%'}}>
            {syncing==true && SyncCompleted==false && 
                <View style={{flex:1,
                height:'90%',alignSelf:'center',
                justifyContent: 'center',
                backgroundColor: '#fff'}}>
                    <Animated.Image 
                        source={require('../assets/images/cloud_load.gif')}  
                        style={{width: 500, height: 300, borderRadius: 10,}}
                    />
                    <View style={{position: 'absolute',paddingTop:30, width: 500,
                    //  backgroundColor: 'yellow'
                     }}>
                    <Text style={{color: 'grey', fontFamily: 'Raleway', fontSize: 20, alignSelf:'center'}}>
                      {t('Syncing')}
                    </Text>
                    </View>
                </View>
            }
        </View>
           
        )
    }
    
}

export const SyncFinished = ({showSyncingCompleted, screenProps: {t}}) => {
//   alert("showSyncingCompleted: "+showSyncingCompleted);
  return(
  <Dialog
                        width={0.9}
                        visible={showSyncingCompleted}
                        rounded
                        dialogAnimation={new ScaleAnimation()}
                        footer={<View/>}
                    >
                        <DialogContent
                            style={{
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical:10,
                            paddingHorizontal: 5,
                            }}
                        >
                            <MaterialCommunityIcons name="cloud-check" size={120} color={"#4caf50"} />
                          <Text style={{color: 'grey', fontFamily: 'Raleway', fontSize: 20, alignSelf:'center'}}>{t('SyncSuccess')}</Text>
                        </DialogContent>
                    </Dialog>
  )
}