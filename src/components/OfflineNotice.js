
import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { toHumanSize } from 'i18n-js';
const { width } = Dimensions.get('window');
function MiniOfflineSign({isConnected,isInternetReachable,t}) {
  // alert("MinOflineSign Connected : "+isConnected);
  // alert("MinOflineSign isInternetReachable : "+isInternetReachable);
  // alert(isConnected+","+isInternetReachable);
  return (
    <View style={{backgroundColor: isConnected ==true && isInternetReachable ==true ?'#66bb6a':'#ef5350',
    // height: 30,
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    // position: 'absolute',
    // top: 30
    }}>
      <Text style={styles.offlineText}>{isConnected==true && isInternetReachable == true ? t("Online") : t("Offline")}</Text>
    </View>
  );
}




class OfflineNotice extends PureComponent { 
    state ={
      disappear: false
    }

  render() {
    const{disappear}= this.state;

  const{isConnected,isInternetReachable,t,stopToaster}= this.props;
    
      //  console.log("disappear state :"+disappear);
      return (
        <MiniOfflineSign stopToaster={stopToaster} t={t} isConnected={isConnected} isInternetReachable={isInternetReachable} />
       )
     }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#e57373',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: 30
  },
  offlineText: { 
    color: '#fff'
  }
});
export default OfflineNotice;