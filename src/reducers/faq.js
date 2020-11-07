import {
    FAQ_RETRIEVE_SUCCESS,
    FAQ_RETRIEVE_REQUEST,
    FAQ_RETRIEVE_FAILURE,
  } from '../actions/faq';
  import initialState from '../store/initialState';
  
  export default (state = initialState.faq, action) => {
    switch (action.type) {
      case FAQ_RETRIEVE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FAQ_RETRIEVE_SUCCESS:
        return {
          ...state,
          list: action.faqs,
          loading: false,
        };
      case FAQ_RETRIEVE_FAILURE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  