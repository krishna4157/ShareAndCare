import React, { Component } from "react";
import NavigationScreens from "./NavigationScreens";
import NetInfo from "@react-native-community/netinfo";
import {storeAppStatus} from '../actions/storeAppStatus';
import OfflineNotice from '../components/OfflineNotice';
import { connect } from "react-redux";
import { storeOfflineFormsToSync} from '../actions/storeAppStatus';
import { bindActionCreators } from "redux";
import { View, Platform } from 'react-native';
import {getOfflineForms,checkForDataSync} from '../utils/offline/dataSync';
import  {storeSyncStatus,updateSyncCompleteStatus} from '../actions/storeAppStatus';
import _ from 'lodash';
// import AsyncStorage from "@react-native-community/async-storage";
import Popup from "../components/Popup";
import HeaderComponent from "../components/Header";
var i=0;

class AppNavigation extends Component {

  state={
    disappear:false,
    isInternetReachable:true,
    connectionStatus: '',
    visible: false,
    errorMessage: '',
    // Status:'',
    // loading: true,
    // isConnected: false,
    // locale: 'en-US',
    // isReady: false,
  }

//   componentWillUnmount() {
//     NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
//  }

 componentDidMount(){
  // this.unsubscribe();
  // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
if(Platform.OS!="web"){
  NetInfo.addEventListener(state => {
    this.handleConnectivityChange(state);
  });
}



}

componentDidUpdate(prevProps){
  const {updateSyncCompleteStatus,storeOfflineFormsToSync,getOfflineForms,appStatus,storeSyncStatus}= this.props;
   prevProps =  prevProps;
   const prevAppStatus = {
     ...prevProps.appStatus,
     isSyncing: null,
     syncCompleted: null,
   };
   const currentAppStatus ={
     ...appStatus,
     isSyncing: null,
     syncCompleted: null,
   };

   const prevprops ={
      isDeviceOnline: prevProps.appStatus.isDeviceOnline,      
   }

   const currentprops = {
     isDeviceOnline: appStatus.isDeviceOnline
   }
   if(!_.isEqual(prevprops,currentprops) && appStatus.isDeviceOnline==true){
    // this.stopToaster();
   }
   if(!_.isEqual(prevAppStatus, currentAppStatus)){
      checkForDataSync(appStatus,storeSyncStatus,updateSyncCompleteStatus,storeOfflineFormsToSync);
      
   }
  // NetInfo.fetch().then(state => {
  //   if(i==0){
  //      if(this.props.isConnected==true && this.props.appStatus.isDeviceOnline==true){
  //         } else{
  //           this.setState({
  //             disappear:false
  //           })
  //         }
  //   this.setState({isInternetReachable:state.isConnected});
  //   i++;
  // }
  // })
}
handleConnectivityChange = state => {
  const {storeAppStatus,screenProps:{t}} = this.props;
  if(state.type=="none" || state.type=="unknown"){
    storeAppStatus(false); 
    this.setDissapearStatus();
    this.setState({
      visible:true,
      errorMessage:t('OfflineMessage'),
    })

   } else if(state.isConnected==true && state.isInternetReachable == true){ 

  //   alert(JSON.stringify(state));
     storeAppStatus(true);  
    this.stopToaster();
   } else {
    storeAppStatus(false); 
    this.setDissapearStatus();
    this.setState({
      visible:true,
      errorMessage:t('OfflineMessage'),
    })
   }
}


closePopup = () => {
  this.setState(prevState => {
    return {
    ...prevState,
    errorMessage: '',
    visible:false,
  }});
}

// checkFunction=(prevProps)=>{
//   const{appStatus}=this.props;
//   if(prevProps.appStatus.isDeviceOnline != appStatus.isDeviceOnline && appStatus.isDeviceOnline==true && prevProps!=0){
//     return true;
//   } else {
//     return false;
//   }
// }
  
stopToaster=()=>{
  setTimeout(() => {this.setState({disappear: true})}, 5000);
}

setDissapearStatus = () => {
  this.setState({
    disappear: false
  })
}
  
  render() {
    const { screenProps ,isConnected,appStatus,unreadChats} = this.props;
    const {disappear,isInternetReachable,visible,errorMessage} = this.state;
    const screenPropsAdded = {
      ...screenProps,
      unreadChats: unreadChats
    }
    return (
      <View style={{flex:1}}>
      {disappear ==false && Platform.OS!='web' && <OfflineNotice setDissapearStatus={this.setDissapearStatus} stopToaster={this.stopToaster} t={screenProps.t} isInternetReachable={isInternetReachable} isConnected={isConnected} />}
      <NavigationScreens
        screenProps={screenProps}
      />
    {/* { appStatus.isDeviceOnline ==false &&<Popup t={screenProps.t} message={errorMessage} visible={visible} closePopup={this.closePopup} color={"#e57373"}  />} */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.appStatus.isDeviceOnline,
  appStatus: state.appStatus,
  unreadChats:state.chat.unreadChats.count

});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    storeAppStatus,
    storeOfflineFormsToSync,
    getOfflineForms,
    checkForDataSync,
    storeSyncStatus,
    updateSyncCompleteStatus,
  },
  dispatch,
);


export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);