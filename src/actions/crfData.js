import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { retrieveSingleSvf } from './subjectVisitForm';
export const CRFDATA_UPDATE_REQUEST = createActionType('CRFDATA_UPDATE_EQUEST')
export const CRFDATA_UPDATE_SUCCESS = createActionType('CRFDATA_UPDATE_SUCCESS')
export const CRFDATA_UPDATE_FAILURE = createActionType('CRFDATA_UPDATE_FAILURE')
import Toast from 'react-native-toast-message';
import showToast from '../utils/toast';

const updateCrfDataRequest = () => ({
    type: CRFDATA_UPDATE_REQUEST,
});

const updateCrfDataFailure = (message) => ({
    type: CRFDATA_UPDATE_FAILURE,
    message,
});

const updateCrfDataSuccess = (t) => ({
    type: CRFDATA_UPDATE_SUCCESS,
    locale: t
});

export const updateCrfData = (EncryptedFormData,crfDataInSVF, subject, navigation, from, t, updateOfflineSaveLoading) => async dispatch => {
    dispatch(updateCrfDataRequest());
    try {
            const rsaPublicKey = rsaPublicKey;
            await api.post('/crfData/data/sync/', [EncryptedFormData]);
            dispatch(updateCrfDataSuccess(t));
            updateOfflineSaveLoading(false);
            showToast(t('SavedMessage'), 'success', 3000);
            navigation.navigate(from, {
                isFormSubmitted: true,
            });
        // }
        dispatch(retrieveSingleSvf(crfDataInSVF.id, subject));
        // navigation.goBack();
    } catch(error) {
        console.log(error);
        const message = t('FailedMessage');
        updateOfflineSaveLoading(false);
        // showToast(localeStore.FailedMessage, 'danger', 2000);
        dispatch(updateCrfDataFailure(message));
        // navigation.goBack();
    }
    
}
