import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView } from 'react-native';
  import { connect } from "react-redux";
  import { bindActionCreators } from "redux";
import Introduction from '../components/Introduction';

class IntroductionPage extends React.Component {

 
  
  
    render() {
        const { navigation, screenProps, deviceLocation } = this.props;

        return (
         
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',marginTop:30 }}>
                <Introduction
                 navigation={navigation}
               
                screenProps={screenProps}
                deviceLocation={deviceLocation}
                />
            </View>
        
        );
    }
}


const mapStateToProps = state => ({
    selectedLanguage: state.changeLanguage.selectedLanguage,
    loading: state.loading,
    currentScreen: state.appStatus.currentScreen,
    deviceLocation: state.deviceLocation,
});

export default connect(mapStateToProps)(IntroductionPage);


