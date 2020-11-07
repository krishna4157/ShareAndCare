import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { backgroundColor } from '../../containers/NavigationScreens';
import {setCurrentScreen} from '../../actions/storeAppStatus';
// import AcsLogo from './AcsLogo';
// import { putItem } from '../utils/secureStorageUtils';
import PIN from './PIN';


class PinSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appPin: null,
      loading: false,
    };
  }

  static navigationOptions = ({ navigation, screenProps: { t } }) => ({
    title: t('AppLock'),
  });

  componentDidMount(){
    setCurrentScreen("PIN");
  }

  changeLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    })
  }

  render() {
    const { navigation, screenProps } = this.props;
    const { loading } = this.state;
    const changePin = navigation.getParam('changePin') || false;
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
      <PIN navigation={navigation} changeLoading={this.changeLoading} mode="choose" changePin={changePin} screenProps={screenProps}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PinSetup);