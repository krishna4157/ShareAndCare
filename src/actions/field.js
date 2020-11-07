import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { checkForOfflineFailureStatus } from '../utils/util';

export const FIELD_RETRIEVE_REQUEST = createActionType('FIELD_RETRIEVE_REQUEST');
export const FIELD_RETRIEVE_SUCCESS = createActionType('FIELD_RETRIEVE_SUCCESS');
export const FIELD_RETRIEVE_FAILURE = createActionType('FIELD_RETRIEVE_FAILURE');
export const CONNECTION_FAILED = createActionType('CONNECTION_FAILED');
export const CLEAR_FIELDS = createActionType('CLEAR_FIELDS');

const retrieveFieldsRequest = () => ({
    type: FIELD_RETRIEVE_REQUEST,
});

const retrieveFieldsFailure = (message) => ({
    type: FIELD_RETRIEVE_FAILURE,
    fields: [],
    message,
});

const retrieveFieldsSuccess = (fields) => ({
    type: FIELD_RETRIEVE_SUCCESS,
    fields: fields || [],
});

const retrieveOfflineFieldsSuccess = (fields) => ({
    type: FIELD_RETRIEVE_SUCCESS,
    fields: fields || [],
});

const failedToConnect = (message) => ({
    type: CONNECTION_FAILED,
    fields: [],
    message,
})


export const retrieveFields = (formId, svfId, locale, t) => async dispatch => {
    dispatch(retrieveFieldsRequest());
    try {
        api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/field/form/locale/${formId}/${svfId}`);
        dispatch(retrieveFieldsSuccess(res.data));
    } catch(error) {
        console.log(error);
        const response = error.request._response;
        if(checkForOfflineFailureStatus(response)) {
            const message="Showing Offline Data. Please check your Internet Connection.";
            dispatch(failedToConnect(message));
        } else {
            const message='Showing Offline Data. Please check your Internet Connection.';
            dispatch(failedToConnect(message));
        };
    }
    
}

export const emptyFieldsInStore = () => ({
    type: CLEAR_FIELDS,
})
