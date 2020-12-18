import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveLogin } from '../actions/login';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { setCurrentScreen } from '../actions/storeAppStatus';
import PinScreen from "../components/PinScreen";
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
        const title = navigation.getParam("title");
        const changePin = navigation.getParam("ChangePin");
        const oldPin = navigation.getParam("oldPin");
        const newPin = navigation.getParam("newPin");
        const submitPin = navigation.getParam("submitPin");
        
        

        return (
            <View style={{flex:1,marginTop:30}}>
            <PinScreen submitPin={submitPin} newPin={newPin} oldPin={oldPin} changePin={changePin} title={title} navigation={navigation}
                title={title}
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
