import createActionType from "../utils/action";
import api from "../utils/api";
import { retrieveLoginSuccess, storeData, retrieveLoginOfflineSuccess } from "../actions/login";
import { localeStore } from "../utils/localization/localizationUtils";
import showToast from '../utils/toast';
import appConstants from "../constants/appConstants";

export const SELECT_TIMEZONE = "SELECT_TIMEZONE";
export const RETRIEVE_TIMEZONES = createActionType("RETRIEVE_TIMEZONES");
export const UPDATE_TIMEZONE_SUCCESS = "UPDATE_TIMEZONE_SUCCESS";
export const UPDATE_TIMEZONE_REQUEST = "UPDATE_TIMEZONE_REQUEST";
export const UPDATE_TIMEZONE_FAILURE = "UPDATE_TIMEZONE_FAILURE";

const selectTimeZone = timeZone => ({
  type: SELECT_TIMEZONE,
  value: timeZone
});

export const timeZoneSelected = () => dispatch => {
  dispatch(selectTimeZone());
};

const retrieveTimeZones = timeZones => ({
  type: RETRIEVE_TIMEZONES,
  timeZones
});

const updateSubjectTimeZone = () => ({
  type: UPDATE_TIMEZONE_SUCCESS
});

const updateSubjectTimeZoneReq = () => ({
    type: UPDATE_TIMEZONE_REQUEST
});

const updateSubjectTimeZoneFailure = (message) => ({
    type: UPDATE_TIMEZONE_FAILURE,
    message,
  });


export const retrieveTimeZonesList = () => async dispatch => {
  try {
    const res = await api.get("/timeZone/");
    dispatch(retrieveTimeZones(res.data));
  } catch (error) {
    // showToast(localeStore.FailedRetrieveTimezones, "danger", 2000);
    console.log(error);
  }
};

export const updateTimeZone = (subject, subjectStudyMetaData, navigation, t) => async dispatch => {
  try {
    dispatch(updateSubjectTimeZoneReq());
    await api.put(`/subject/timeZone`, subject);
    dispatch(updateSubjectTimeZone());
    // dispatch(retrieveLoginSuccess(subject, subject.password));
    await storeData(subjectStudyMetaData);
    dispatch(retrieveLoginOfflineSuccess(subjectStudyMetaData));
    // showToast(t('SavedMessage'), "success", 3000);
    navigation.navigate(`${appConstants.urlPrefix}RootTabs`);
  } catch (error) {
    const message=t('FailedUpdateTimeZone');
    dispatch(updateSubjectTimeZoneFailure(message));

    console.log(error);
    showToast(t('FailedMessage'), "danger", 2000);
  }
};
