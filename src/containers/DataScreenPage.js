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
import DataScreen from "../components/DataScreen";
class DataScreenPage extends Component {
    state={
        deviceToken: '',
    };

    // componentDidMount(){
    //     const {setCurrentScreen}=this.props;

    //     setCurrentScreen("LOGIN");
    //     // if(Platform.OS === 'ios') {
    //     //     setupInitialHealthKit();
    //     //   }
    // }
    
    // async componentDidMount() {
        
    //     // try {
    //     //     const deviceToken = await getDeviceToken();
    //     //     this.setState({
    //     //         deviceToken,
    //     //     })
    //     // } catch(error) {
    //     //     console.log(error)
    //     // }
    // }

    render() {
        const { navigation, } = this.props;
        const { deviceToken } = this.state;
        const text = navigation.getParam("BackendData");
        return (
            <DataScreen
                text={text}
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

export default connect(mapStateToProps, mapDispatchToProps)(DataScreenPage);
