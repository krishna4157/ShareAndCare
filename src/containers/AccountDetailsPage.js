import React, { Component } from "react";
// import { setupInitialHealthKit, getWeight } from '../utils/healthKit/Healthkit';
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import AccountDetailsScreen from "../components/AccountDetails";
import HeaderComponent from "../components/Header";
class AccountDetailsPage extends Component {
    state={
        deviceToken: '',
    };

    static navigationOptions = {
        title: 'Details',
      };


    render() {
        const { navigation, } = this.props;
        const { deviceToken } = this.state;
        // const text = navigation.getParam("BackendData");
        return (
            <View style={{flex:1,marginTop:30}}>
            <HeaderComponent title='Account Details' navigation={navigation} /> 
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
