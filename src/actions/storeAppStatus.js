import createActionType from '../utils/action';

export const STORE_APP_STATUS = createActionType('STORE_APP_STATUS');
export const STORE_OFFLINE_FORMS_TO_SYNC = createActionType('STORE_OFFLINE_FORMS_TO_SYNC');
export const STORE_CURRENT_SCREEN = createActionType('STORE_CURRENT_SCREEN');
export const STORE_SYNC_STATUS = createActionType('STORE_SYNC_STATUS');
export const UPDATE_SYNC_COMPLETE_STATUS = createActionType('UPDATE_SYNC_COMPLETE_STATUS');


const storeAppStatusSuccess = (status) => ({
    type: STORE_APP_STATUS,
    isDeviceOnline : status,
});

const storeOfflineFormsToSyncSuccess = (noOfForms) => ({
    type: STORE_OFFLINE_FORMS_TO_SYNC,
    noOfForms : noOfForms,
});

const setCurrentScreenSuccess = (screen) => ({
    type: STORE_CURRENT_SCREEN,
    screen : screen,
});

const storeSyncStatusSuccess =(value)=>({
    type: STORE_SYNC_STATUS,
    value:value,
})


const updateSyncCompleteStatusSuccess =(value)=>({
    type: UPDATE_SYNC_COMPLETE_STATUS,
    value:value,
})


export const storeAppStatus = (status) => dispatch => {
       dispatch(storeAppStatusSuccess(status));
}

export const setCurrentScreen = (screen) => dispatch => {
    dispatch(setCurrentScreenSuccess(screen));
}

export const storeSyncStatus = (value) => dispatch => {
    dispatch(storeSyncStatusSuccess(value));
}

export const storeOfflineFormsToSync = (noOfForms) => dispatch => {
    dispatch(storeOfflineFormsToSyncSuccess(noOfForms));
}

export const updateSyncCompleteStatus = (value) => dispatch => {
    dispatch(updateSyncCompleteStatusSuccess(value));
}

