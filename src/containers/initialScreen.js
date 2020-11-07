import React from 'react';
import { BackHandler, StyleSheet, View, Text, Platform } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { secureStorageContainsPin } from '../utils/secureStorageUtils';
import { storeDeviceLocationDetails } from '../actions/deviceLocation';
import { findDeviceLocationDetails } from '../utils/deviceLocationUtils';

class InitialScreen extends React.Component {
   state={

   };
   
   async componentDidMount() {
       const { navigation } = this.props;
       const { storeDeviceLocationDetails: storeDevLocDetails } = this.props;
       try {
          await findDeviceLocationDetails(storeDevLocDetails);
       } catch(error) {
           console.log(error)
       }
    setTimeout(async () => {
        try {
            const pinExists = await secureStorageContainsPin('appPin');
            if(pinExists && Platform.OS!='web') {
                navigation.replace('PinValidate', {login: true});
              } else {
                navigation.replace('Login');
              }
        } catch(error) {
            console.log(error)
        }
    }, 1500);
   }

    render() {
      return (
        <View style={styles.container}>
         <Text style={{ fontSize: 25}}></Text>
        </View>
      );
    }
  }

const mapStateToProps = state => ({
  // selectedLanguage: state.changeLanguage.selectedLanguage,
  loading: state.loading,
  // currentScreen: state.appStatus.currentScreen 
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    storeDeviceLocationDetails
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    image: {
        width: 180,
        resizeMode: 'contain'
      },
      logo: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }
  })
