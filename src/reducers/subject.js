import {
    LOGIN_RETRIEVE_SUCCESS,
    LOGIN_RETRIEVE_REQUEST,
    LOGIN_RETRIEVE_FAILURE,
    STORE_SUBJECT_SELECTED_LANGUAGE,
  } from '../actions/login';
  import initialState from '../store/initialState';
  
  export default (state = initialState.subject, action) => {
    switch (action.type) {
      case LOGIN_RETRIEVE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_RETRIEVE_SUCCESS:
        return {
          ...state,
          ...action.subject,
          loading: false,
        };
      case LOGIN_RETRIEVE_FAILURE:
        return {
          ...state,
          loading: false,
        };
      case STORE_SUBJECT_SELECTED_LANGUAGE:
      return {
        ...state,
        locale: action.subject.selectedLanguage,
        loading: false,
      };
      default:
        return state;
    }
  };
  