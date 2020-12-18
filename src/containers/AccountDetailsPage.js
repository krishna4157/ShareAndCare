import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from '../components/Login';
import { retrieveLogin } from '../actions/login';
import {localeStore} from '../utils/localization/localizationUtils';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import {setCurrentScreen} from '../actions/storeAppStatus';
// import { setupInitialHealthKit, getWeight } from '../utils/healthKit/Healthkit';
import { Platform, View } from "react-native";
import AccountDetailsScreen from "../components/AccountDetails";
import { Text } from "react-native";
import HeaderComponent from "../components/Header";
class AccountDetailsPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const { navigation, } = this.props;
        const { deviceToken } = this.state;
        const text = navigation.getParam("BackendData");
        return (
            <View style={{flex:1,marginTop:30}}>
            <HeaderComponent navigation={navigation} /> 
           <AccountDetailsScreen />
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

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveLogin,
        setCurrentScreen
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsPage);
