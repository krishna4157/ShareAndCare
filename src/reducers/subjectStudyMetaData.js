import {
  OFFLINE_DATA_RETRIEVE_SUCCESS,
  } from '../actions/login';
  import { UPDATE_SITE} from '../actions/subjectStudyMetaData';
  import initialState from '../store/initialState';
  
  export default (state = initialState.subjectStudyMetaData, action) => {
    switch (action.type) {
      case OFFLINE_DATA_RETRIEVE_SUCCESS:
        return {
          ...state,
          ...action.offlineData,
          loading: false,
        };
      case UPDATE_SITE: {
        console.log(state);
        return {
          ...state,
          studySite: {
            ...state.studySite,
            client: action.client,
          }
        }
      }
      default:
        return state;
    }
  };
  