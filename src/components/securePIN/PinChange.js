import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { backgroundColor } from '../../containers/NavigationScreens';
// import AcsLogo from './AcsLogo';
import { secureStorageContainsPin } from '../../utils/secureStorageUtils';
import PIN from './PIN';
import {setCurrentScreen} from '../../actions/storeAppStatus';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class PinChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount(){
    setCurrentScreen("PIN");
  }

  static navigationOptions = ({ navigation, screenProps: {t} }) => ({
    title: t('AppLock'),
  });

  retrieveAppPin = async () => {
    const appPin = await secureStorageContainsPin('appPin');
    this.setState({
      appPin,
      loading: false,
    });
  }
  
  render() {
    const { loading, appPin } = this.state;
    const { navigation, screenProps } = this.props;
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
       {!loading && <PIN appPin={appPin} mode='validate' navigation={navigation} changePin screenProps={screenProps}/>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
 
  currentScreen: state.appStatus.currentScreen 
});

const mapDispatchToProps = dispatch => bindActionCreators(
{
    setCurrentScreen
},
dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(PinChange);