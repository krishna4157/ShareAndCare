import createActionType from '../utils/action';
import _ from 'lodash';
import AsyncStorage  from '@react-native-community/async-storage'
import { OFFLINE_DATA_RETRIEVE_SUCCESS } from './login';
import api from '../utils/api';
import initialState from '../store/initialState';
import appConstants from '../constants/appConstants';

export const OFFLINE_DATA_RETRIEVE_REQUEST = createActionType('OFFLINE_DATA_RETRIEVE_REQUEST');
export const OFFLINE_DATA_RETRIEVE_FAILURE = createActionType('OFFLINE_DATA_RETRIEVE_AILURE');
export const UPDATE_SITE = createActionType('UPDATE_SITE');

const getOfflineDataRequest = () => ({
  type: OFFLINE_DATA_RETRIEVE_REQUEST
})

const getOfflineDataFailed = () => ({
  type: OFFLINE_DATA_RETRIEVE_FAILURE
})

const updateSite = (data) => ({
  type: UPDATE_SITE,
  client: data,
})
const getOfflineDataSuccess = (data) => ({
  type: OFFLINE_DATA_RETRIEVE_SUCCESS,
  offlineData: data,
});

export const getOfflineData = (navigation) => async dispatch => {
  dispatch(getOfflineDataRequest());
  try {
      const data = await AsyncStorage.getItem("subjectStudyMetaData");
      // const data = initialState.subjectStudyMetaData;
      if (data != null && data != '' && data != undefined) {
        dispatch(getOfflineDataSuccess(JSON.parse(data)));
        navigation.navigate(`${appConstants.urlPrefix}RootTabs`);
      } else {
        dispatch(getOfflineDataFailed());
      }
  } catch(e) {
    console.log(e);
    dispatch(getOfflineDataFailed());
  }
}

export const getContactDetails = (id) => async dispatch => {
  try {
    const res = await api.get(`/siteDetails/${id}`);
    dispatch(updateSite(res.data));
  } catch (error) {
    console.log(error);
  }
}