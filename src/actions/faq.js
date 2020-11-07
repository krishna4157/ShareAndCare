import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { generateBasicAuthToken } from '../utils/util';
import showToast from '../utils/toast';

export const FAQ_RETRIEVE_REQUEST = createActionType('FAQ_RETRIEVE_REQUEST')
export const FAQ_RETRIEVE_SUCCESS = createActionType('FAQ_RETRIEVE_SUCCESS')
export const FAQ_RETRIEVE_FAILURE = createActionType('FAQ_RETRIEVE_FAILURE')
export const FAQ_RETRIEVE_ERROR = createActionType('FAQ_RETRIEVE_ERROR')

const retrieveFAQsRequest = () => ({
    type: FAQ_RETRIEVE_REQUEST,
});

const retrieveFAQsFailure = (message) => ({
    type: FAQ_RETRIEVE_FAILURE,
    message: message
});

const retrieveFAQsSuccess = (res, t) => ({
    type: FAQ_RETRIEVE_SUCCESS,
    faqs: res.data,
    locale: t,
});

export const retrieveFAQs = (studyId, subject, t) => async dispatch => {
    dispatch(retrieveFAQsRequest());
    try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        // api.defaults.headers.common['Accept-Language'] = locale;
        const res = await api.get(`/studyFaq/study/${studyId}`);
        dispatch(retrieveFAQsSuccess(res, t));
    } catch(error) {
        console.log(error)
        // showToast(localeStore.FailedRetrieve, 'danger', 2000);
        const message=t('FailedRetrieveFaqs');
        dispatch(retrieveFAQsFailure(message));
    }
    
}
