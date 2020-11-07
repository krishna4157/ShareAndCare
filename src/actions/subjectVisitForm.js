import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { generateBasicAuthToken } from '../utils/util';
import { localeStore } from '../utils/localization/localizationUtils';
import showToast from '../utils/toast';
export const SVFS_RETRIEVE_REQUEST = createActionType('SVFS_RETRIEVE_REQUEST')
export const SVFS_RETRIEVE_SUCCESS = createActionType('SVFS_RETRIEVE_SUCCESS')
export const SVFS_RETRIEVE_FAILURE = createActionType('SVFS_RETRIEVE_FAILURE')

export const SVFSLIST_RETRIEVE_REQUEST = createActionType('SVFSLIST_RETRIEVE_REQUEST')
export const SVFSLIST_RETRIEVE_SUCCESS = createActionType('SVFSLIST_RETRIEVE_SUCCESS')
export const SVFSLIST_RETRIEVE_FAILURE = createActionType('SVFSLIST_RETRIEVE_FAILURE')

export const SVF_RETRIEVE_REQUEST = createActionType('SVF_RETRIEVE_REQUEST')
export const SVF_RETRIEVE_SUCCESS = createActionType('SVF_RETRIEVE_SUCCESS')
export const SVF_RETRIEVE_FAILURE = createActionType('SVF_RETRIEVE_FAILURE')

export const STORE_SELECTED_SVF = createActionType('STORE_SELECTED_SVF')

const retrieveSvfsByScheduledDateRequest = () => ({
    type: SVFS_RETRIEVE_REQUEST,
});

const retrieveSvfsByScheduledDateFailure = (message) => ({
    type: SVFS_RETRIEVE_FAILURE,
    message,
});

const retrieveSvfsByScheduledDateSuccess = (res) => ({
    type: SVFS_RETRIEVE_SUCCESS,
    svfs: _.keyBy(res.data, svf => svf.id) || []
});

export const retrieveSvfsByScheduledDate = (subject, scheduleDate, locale, t) => async dispatch => {
    
    dispatch(retrieveSvfsByScheduledDateRequest());
    try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/subjectVisitForm/subject/${subject.id}/${scheduleDate}`);
        // alert('retrieveSvfsByScheduledDate success');
        dispatch(retrieveSvfsByScheduledDateSuccess(res));
    } catch(error) {
        const message = t('FailedRetrieveForms')
        dispatch(retrieveSvfsByScheduledDateFailure(message));
        console.log(error)
    }
    
}

const retrieveSvfsForASubjectRequest = () => ({
    type: SVFS_RETRIEVE_REQUEST,
});

const retrieveSvfsForASubjectFailure = (error) => ({
    type: SVFS_RETRIEVE_FAILURE,
    error,
});

const retrieveSvfsForASubjectSuccess = (res) => ({
    type: SVFS_RETRIEVE_SUCCESS,
    svfs: _.keyBy(res.data, svf => svf.id) || []
});

export const retrieveSvfsForASubject = (subject, locale) => async dispatch => {
    // alert('retrieveSvfsForASubject');
    dispatch(retrieveSvfsForASubjectRequest());
    try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/subjectVisitForm/subject/${subject.id}`);
        dispatch(retrieveSvfsForASubjectSuccess(res));
    } catch(error) {
        showToast (localeStore.FailedRetrieve, 'danger', 3000);
        dispatch(retrieveSvfsForASubjectFailure(error));
        console.log(error)
    }
    
}

const retrieveAllSvfsForASubjectRequest = () => ({
    type: SVFSLIST_RETRIEVE_REQUEST,
});

const retrieveAllSvfsForASubjectFailure = (error) => ({
    type: SVFSLIST_RETRIEVE_FAILURE,
    error,
});

const retrieveAllSvfsForASubjectSuccess = (res) => ({
    type: SVFSLIST_RETRIEVE_SUCCESS,
    svfs: _.keyBy(res.data, svf => svf.id) || []
});

export const retrieveAllSvfsForASubject = (subject, locale) => async dispatch => {
    // alert('retrieveSvfsForASubject');
    dispatch(retrieveAllSvfsForASubjectRequest());
    try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/subjectVisitForm/subject/${subject.id}`);
        dispatch(retrieveAllSvfsForASubjectSuccess(res));
    } catch(error) {
        showToast (localeStore.FailedRetrieve, 'danger', 3000);
        dispatch(retrieveAllSvfsForASubjectFailure(error));
        console.log(error)
    }
    
}

const retrieveSingleSvfRequest = () => ({
    type: SVF_RETRIEVE_REQUEST,
});

const retrieveSingleSvfFailure = (error) => ({
    type: SVF_RETRIEVE_FAILURE,
    error
});

const retrieveSingleSvfSuccess = (res) => ({
    type: SVF_RETRIEVE_SUCCESS,
    svf: res.data,
});

export const retrieveSingleSvf = (id, subject) => async dispatch => {
    // alert('retrieveSingleSvf');
    dispatch(retrieveSingleSvfRequest());
    try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        // api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/subjectVisitForm/${id}`);
        dispatch(retrieveSingleSvfSuccess(res));
    } catch(error) {
        showToast (localeStore.FailedRetrieve, 'danger', 3000);
        dispatch(retrieveSingleSvfFailure(error));
        console.log(error)
    }
}

const _storeSelectedSvf = (svf) => ({
    type: STORE_SELECTED_SVF,
    svf: svf,
});

export const storeSelectedSvf = (svf) => dispatch => {
    dispatch(_storeSelectedSvf(svf));
}
