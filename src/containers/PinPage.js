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
import PinScreen from "../components/PinScreen";
import { View } from "react-native";
import HeaderComponent from "../components/Header";
class PinPage extends Component {
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
            <View style={{flex:1,marginTop:30}}>
            <PinScreen navigation={navigation}
                text={text}
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

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveLogin,
        setCurrentScreen
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PinPage);
