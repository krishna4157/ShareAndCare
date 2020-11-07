import {
    CRFDATA_UPDATE_SUCCESS,
    CRFDATA_UPDATE_REQUEST,
    CRFDATA_UPDATE_FAILURE,
  } from '../actions/crfData';
  import initialState from '../store/initialState';
  
  export default (state = initialState.crfData, action) => {
    switch (action.type) {
      case CRFDATA_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CRFDATA_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case CRFDATA_UPDATE_FAILURE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  