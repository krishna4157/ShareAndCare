import {
    STORE_DEVICE_LOCATION_DETAILS
  } from '../actions/deviceLocation';
  import initialState from '../store/initialState';
  
  export default (state = initialState.deviceLocation, action) => {
    switch (action.type) {
      case STORE_DEVICE_LOCATION_DETAILS:
        return {
          ...state,
          ...action.data,
        };
      default:
        return state;
    }
  };
  