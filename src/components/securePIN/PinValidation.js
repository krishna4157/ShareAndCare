import React, { Component } from 'react';
import {
  View, Platform, ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationEvents } from 'react-navigation';
// import AcsLogo from './AcsLogo';
import { backgroundColor } from '../../containers/NavigationScreens';
import { getOfflineData } from '../../actions/subjectStudyMetaData';
import {storeOfflineFormsToSync} from '../../actions/storeAppStatus';
import {retrieveTimeZonesList} from '../../actions/timeZone';
import { secureStorageContainsPin, retrieveSubjectCredentials } from '../../utils/secureStorageUtils';
import PIN from './PIN';
// import AsyncStorage from '@react-native-community/async-storage';
import {getOfflineForms} from '../../utils/offline/dataSync';
import {setCurrentScreen} from '../../actions/storeAppStatus';
// import { setupInitialHealthKit } from '../../utils/healthKit/Healthkit';


class PinValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appPin: null,
      loading: false,
    };
  }

  componentDidMount(){
    const {setCurrentScreen, retrieveTimeZonesList}= this.props;
    setCurrentScreen("PIN");
    retrieveTimeZonesList();
    if(Platform.OS === 'ios') {
      // setupInitialHealthKit();
    }
  }
  
  retrieveAppPin = async () => {
    try {
      const appPin = await secureStorageContainsPin('appPin');
      this.setState({
        appPin,
        loading: false,
      });
    } catch(error) {
      console.log(error)
    }
  }

  login = async () => {
    
    const { storeOfflineFormsToSync:formsToSync,selectedLanguage, navigation, screenProps: { t }, retrieveOfflineData } = this.props;
    const OfflineForms = await getOfflineForms();
    // console.log(JSON.stringify(OfflineForms));
    if(OfflineForms!=null && OfflineForms.length!=0){
      formsToSync(JSON.parse(OfflineForms).length)
    } else {
      formsToSync(0)
    }
    
    retrieveOfflineData(navigation);
  }

  render() {
    const { navigation, loading: appLoading, screenProps } = this.props;
    const { loading, appPin } = this.state;
    return (
      <View style={{ flex: 1}}>
      {loading && 
          <View style={{flex:1,position:'absolute',alignItems:'center',alignSelf:'center'}}>
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        }
      <NavigationEvents  onWillFocus={() => {
        this.retrieveAppPin();
      }}/>
      { !loading && <PIN login={this.login} navigation={navigation} mode="validate" appPin={appPin} screenProps={screenProps}/> }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: state.changeLanguage.selectedLanguage,
  loading: state.loading,
  currentScreen: state.appStatus.currentScreen 

});

const mapDispatchToProps = dispatch => bindActionCreators(
{
    retrieveOfflineData: getOfflineData,
    storeOfflineFormsToSync,
    setCurrentScreen,
    retrieveTimeZonesList
},
dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(PinValidation);