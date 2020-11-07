import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { generateBasicAuthToken } from '../utils/util';
import { retrieveTimeZonesList } from '../actions/timeZone';
import { setSubjectCredentials, setSubjectDeviceToken } from '../utils/secureStorageUtils';
import AsyncStorage from '@react-native-community/async-storage';
import { getUniqueId } from 'react-native-device-info';
import Constants from 'expo-constants';
// import { getUniqueId, getManufacturer,getModel,getVersion } from 'react-native-device-info';
import { Platform } from 'react-native';
import {deviceConfig} from '../utils/deviceConfig';
// import { setupInitialHealthKit } from '../utils/healthKit/Healthkit';
import showToast from '../utils/toast';
import uuid from 'react-uuid'
import appConstants from '../constants/appConstants';

export const LOGIN_RETRIEVE_REQUEST = createActionType('LOGIN_RETRIEVE_REQUEST')
export const LOGIN_RETRIEVE_SUCCESS = createActionType('LOGIN_RETRIEVE_SUCCESS')
export const LOGIN_RETRIEVE_FAILURE = createActionType('LOGIN_RETRIEVE_AILURE')
export const OFFLINE_DATA_RETRIEVE_SUCCESS = createActionType('OFFLINE_DATA_RETRIEVE_SUCCESS')
const retrieveLoginRequest = () => ({
  type: LOGIN_RETRIEVE_REQUEST,
});

const retrieveLoginFailure = () => ({
  type: LOGIN_RETRIEVE_FAILURE,
});

export const retrieveLoginOfflineSuccess = (data) => ({
  type: OFFLINE_DATA_RETRIEVE_SUCCESS,
  offlineData: data,
});

export const retrieveLoginSuccess = (res, password) => ({
  type: LOGIN_RETRIEVE_SUCCESS,
  subject: {
    ...res,
    password,
  }
});

export const storeData = async (data) => {
  try {
    await AsyncStorage.setItem("subjectStudyMetaData", JSON.stringify(data));
  } catch (e) {
    // saving error
  }
}

export const retrieveLogin = (subject, navigation, locale, deviceToken, hasPinSetup, t,deviceName,systemVersion,os) => async dispatch => {
  const obj = deviceConfig();
  const data = {
    subject,
    mobileInfo :{
      systemVersion: obj.systemVersion,
      os: obj.os,
      deviceId: Platform.OS !== 'web' ? getUniqueId() : uuid(),
    }
  }  
  dispatch(retrieveLoginRequest());
    try {
        const config = {
          headers: {
            Authorization: generateBasicAuthToken(subject.phoneNo, subject.password),
          }
        }

        api.defaults.headers.common['Accept-Language'] = locale;
        api.defaults.headers.common['Client-Type'] = "mobile";
        // api.defaults.headers.common.Type = "mobile";
        const res = await api.post(`/subject/login`, data, config);
        await setSubjectDeviceToken(res.headers['device-token'], res.headers['device-token-id']);
        
        await dispatch(retrieveTimeZonesList());
        if(Platform.OS === 'ios') {
          // setupInitialHealthKit();
        }
        if (!hasPinSetup) setSubjectCredentials(JSON.stringify(subject));
        // dispatch(retrieveLoginSuccess(res.data, subject.password));
        const offlineData = {
          ...res.data,
          subject: {
            ...res.data.subject,
            password: subject.password,
          }
        }
        await storeData(offlineData);
        dispatch(retrieveLoginOfflineSuccess(offlineData));
        const subjectId = offlineData.subject.id;
        if (hasPinSetup) {
            navigation.navigate(`${appConstants.urlPrefix}RootTabs`);
        } else {
            updateDeviceToken({
                deviceToken: deviceToken,
                subjectId,
            });
            if(Platform.OS=='web'){
            navigation.navigate('SubjectTimeZone', {fromLogin: true});
            } else {
            // navigation.navigate('RootTabs');

            navigation.navigate('PinSetup');
            }
        }
    } catch (error) {
        console.log(error);
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    showToast(t('NetworkError'), 'danger', 3000);
                    break;
                case 500:
                    showToast(t('SomethingWrong'), 'danger', 3000);
                    break;
                case 401 || 403:
                    showToast(t('InvPhonePSWD'), 'danger', 3000);
                    break;
                case 423 :
                    showToast(t('UserLocked'), 'danger', 3000);
                    break;  
                default:
                    showToast(t('NetworkError'), 'danger', 3000);
            }
        } else {
            showToast(t('NetworkError'), 'danger', 3000);
        }
        dispatch(retrieveLoginFailure());
    }
}

const updateDeviceToken = async (subject) => {
  try {
    await api.put('/subject/device/updateToken', subject);
  } catch (error) {
    console.log(error);
  }
}
