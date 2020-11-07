import moment from 'moment';
import {SAVE_HEALTHKIT_DATA, RETRIEVE_HEALTHKIT_DATA_SUCCESS} from '../actions/healthkit';
import initialState from '../store/initialState';

const healthkitData = (state = initialState.healthkitData, action) => {
  switch (action.type) {
    case SAVE_HEALTHKIT_DATA:
    return {
        ...state, 
        subjectHealthData: {
          ...action.healthkitData.subjectHealthData,
        },
        subjectActivity: {
          ...action.healthkitData.subjectActivity,
        },
        lastSync: new Date(),
    };
    
    case RETRIEVE_HEALTHKIT_DATA_SUCCESS:
    return {
        ...state, 
        ...action.healthkitData
    };
    default:
      return state;
  }
};

export default healthkitData;
