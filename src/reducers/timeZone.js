import {SELECT_TIMEZONE} from '../actions/timeZone';
import {RETRIEVE_TIMEZONES,UPDATE_TIMEZONE} from '../actions/timeZone';

import initialState from '../store/initialState';


const selectTimeZone = (state = initialState.timeZone, action) => {
  switch (action.type) {
    case RETRIEVE_TIMEZONES:
    return {
      ...state,
      list: action.timeZones,
    };
    case UPDATE_TIMEZONE:
    return {
      ...state,
    }


    default:
      return state;
  }
};

export default selectTimeZone;