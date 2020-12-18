import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from '../components/Login';
import { retrieveLogin } from '../actions/login';
import {localeStore} from '../utils/localization/localizationUtils';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import {setCurrentScreen} from '../actions/storeAppStatus';
// import { setupInitialHealthKit, getWeight } from '../utils/healthKit/Healthkit';
import { Platform } from "react-native";
import ChristmasScreen from "../components/ChristmasScreen";
class ChristmasPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation} = this.props;
        return (
            <ChristmasScreen navigation={navigation}
            />
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      loading: state.loading,
      currentScreen: state.appStatus.currentScreen,
      deviceLocation: state.deviceLocation,
});


export default connect(mapStateToProps)(ChristmasPage);
