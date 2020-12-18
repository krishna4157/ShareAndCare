import React, {Component,useEffect} from 'react';
import * as Font from 'expo-font';
import { View, Platform, 
  SafeAreaView,Image,Text 
} from 'react-native';
import { Root } from 'native-base';
import AppNavigation from './AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/configStore';
import { Provider } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import i18n from '../utils/localization/localizationUtils';
import { backgroundColor } from '../containers/NavigationScreens';
// import RNBootSplash from "react-native-bootsplash";
// import SplashScreen from 'react-native-smart-splash-screen'
// import { SplashScreen as ExpoSplashScreen } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import OfflineNotice from '../components/OfflineNotice';
// import NetInfo from '@react-native-community/netinfo';
import { getItem } from '../utils/secureStorageUtils';
import toasters from  '../constants/toasters';
import Toast from 'react-native-toast-message';
const toastConfig = {
  error:  (internalState) => toasters(internalState,'error'),
  success: (internalState) => toasters(internalState,'success'),
  info:  (internalState) => toasters(internalState,'info'),
};
class App extends Component {
    state = {
      Status:'',
      loading: true,
      locale: 'en-US',
      isReady: false,
      isAppReady: false
    };

  async componentDidMount () {
    // this.unsubscribe();
    
    // SplashScreen.hideAsync()
    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    console.disableYellowBox = true;
    // alert('App is readyyyy1111');
      if(Platform.OS !== 'ios'){
        // SplashScreen.hideAsync()
      //   SplashScreen.close({
      //     animationType: SplashScreen.animationType.fade,
      //     duration: 1000,
      //     delay: 12000,
      //  })
      } 
      // alert('App is readyyy222');
      try {
        await Font.loadAsync({
          // antoutline:require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
          Roboto: require ('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require ('native-base/Fonts/Roboto_medium.ttf'),
          Montserrat: require('../../assets/Montserrat/Montserrat-Regular.ttf'),
          Raleway: require('../../assets/Raleway/Raleway-Medium.ttf') ,
          Work_Sans: require('../../assets/Work_Sans/WorkSans-Medium.ttf'),
          RalewayItalic: require('../../assets/Raleway/Raleway-Italic.ttf') ,
          RalewayBold: require('../../assets/Raleway/Raleway-SemiBold.ttf') ,
          RalewayBoldItalic: require('../../assets/Raleway/Raleway-BoldItalic.ttf'),
          RalewayExtraLight: require('../../assets/Raleway/Raleway-ExtraLight.ttf'),
          WorkSansThin: require('../../assets/Work_Sans/WorkSans-Thin.ttf'),
          WorkSansLight: require('../../assets/Work_Sans/WorkSans-Light.ttf'),
          WorkSansExtraLight: require('../../assets/Work_Sans/WorkSans-ExtraLight.ttf'),
          ChristmasFont : require('../../assets/MerryChristmasFlake.ttf'),
          ChristmasStar : require('../../assets/MerryChristmasStar.ttf'),
          BabyLovely : require('../../assets/BabyLovely.ttf'),
          Winterland : require('../../assets/Winterland.ttf'),
        });
      } catch(error) {
        // alert('App is readyyy errrrooorrr');
        console.log('Font Error: ', error)
      }
    
    // alert('App is readyyy333');
    this.setState ({loading: false, isAppReady: true});
    // alert('App is readyyyy');
    // this.setStoredLocale();
    // this.setState ({loading: false, isAppReady: true});
  }

  setStoredLocale = async() => {
    let locale = null;
    // try {
      // locale = await getItem('locale');
      locale = locale || 'en-US';
    // } catch(e) {
      // locale = 'en-US';
    // }
    this.setState({ locale });
  }

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };


  render () {
    const {loading, locale, isAppReady} = this.state;

    
  

    return (
      <Provider  store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <SafeAreaProvider> */}
        {Platform.OS === 'ios' ? <SafeAreaView style={{ flex: 1,marginTop:50}}>
          {/* {disappear ==false && <OfflineNotice isInternetReachable={isInternetReachable} isConnected={this.state.isConnected} />} */}
            {!loading ? 
           
            <AppNavigation 
              screenProps={{
                t: this.t,
                locale: locale,
                setLocale: this.setLocale,
                // isConnected: isConnected
              }}
            />
            : <View/>}
                {/* <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
        </SafeAreaView> 
        : 
                
      // {disappear ==false && <OfflineNotice isInternetReachable={isInternetReachable} isConnected={this.state.isConnected} />} 
          !loading ? 
          <AppNavigation 
          screenProps={{
            t: this.t,
            locale: locale,
            setLocale: this.setLocale,
            // isConnected: isConnected
          }}
        />
         : <View/>}
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />

                {/* </SafeAreaProvider> */}
          </PersistGate>

      </Provider>
    );
  }
  // _cacheSplashResourcesAsync = async () => {
  //   const gif = require('../assets/images/splash.png');
  //   return Asset.fromModule(gif).downloadAsync();
  // };

  _cacheResourcesAsync = async () => {
    // ExpoSplashScreen.hide();
    this.setState({ isAppReady: true });
    const images = [
      require('../assets/images/splash.png'),
      require('../assets/images/splash.png'),
    ];

    // const cacheImages = images.map(image => {
    //   return Asset.fromModule(image).downloadAsync();
    // });

    await Promise.all(cacheImages);
    this.setState({ isAppReady: true });
  };
  
}



export default App;
