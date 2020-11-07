import api from './api';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const deviceConfig = ( ) => {
   if(Platform.OS=='ios'){
const deviceConfiguration = {  
       systemVersion : Constants.platform.ios.systemVersion,
       os : Platform.OS,
      }
     return deviceConfiguration;
   } else {
     const deviceConfiguration ={
      systemVersion : Constants.systemVersion,
      os : Platform.OS,
     }
    return deviceConfiguration;
   }
}