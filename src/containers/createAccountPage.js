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
import CreateAccoount from "../components/CreateAccount";
class CreateAccoountScreen extends Component {
    state={
        deviceToken: '',
    };

    componentDidMount(){
        const {setCurrentScreen}=this.props;

        setCurrentScreen("LOGIN");
        // if(Platform.OS === 'ios') {
        //     setupInitialHealthKit();
        //   }
    }
    
    async componentDidMount() {
        
        // try {
        //     const deviceToken = await getDeviceToken();
        //     this.setState({
        //         deviceToken,
        //     })
        // } catch(error) {
        //     console.log(error)
        // }
    }

    render() {
        const { currentScreen,navigation, retrieveLogin: reqLogin, selectedLanguage, loading, screenProps,setCurrentScreen, deviceLocation } = this.props;
        const { deviceToken } = this.state;
        console.log(screenProps)
        return (
            <CreateAccoount
            setCurrentScreen={setCurrentScreen}
            currentScreen={currentScreen}
             navigation={navigation}
            retrieveLogin={reqLogin}
            selectedLanguage={selectedLanguage}
            deviceToken={deviceToken}
            loading={loading}
            screenProps={screenProps}
            deviceLocation={deviceLocation}
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

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveLogin,
        setCurrentScreen
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccoountScreen);
