import initialState from '../store/initialState';
// import { STORE_APP_STATUS } from '../actions/storeAppStatus';
import { UPDATE_SYNC_COMPLETE_STATUS,STORE_OFFLINE_FORMS_TO_SYNC ,STORE_APP_STATUS,STORE_CURRENT_SCREEN,STORE_SYNC_STATUS} from '../actions/storeAppStatus';


const storeAppStatus = (state = initialState.appStatus, action) => {
  switch (action.type) {
    case STORE_APP_STATUS:
      return {...state, isDeviceOnline: action.isDeviceOnline};
    case STORE_CURRENT_SCREEN:
      return {...state, currentScreen: action.screen};
    case STORE_OFFLINE_FORMS_TO_SYNC:
      return {...state, OfflineFormsToSync: action.noOfForms}
    case STORE_SYNC_STATUS:
      return {...state, isSyncing: action.value}
    case UPDATE_SYNC_COMPLETE_STATUS:
      return {...state, syncCompleted: action.value}
      default:  
      return state;

  }
};



export default storeAppStatus;
