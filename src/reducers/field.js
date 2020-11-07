import {
  FIELD_RETRIEVE_SUCCESS,
  FIELD_RETRIEVE_REQUEST,
  FIELD_RETRIEVE_FAILURE,
  CONNECTION_FAILED,
  CLEAR_FIELDS
} from '../actions/field';
import initialState from '../store/initialState';

export default (state = initialState.field, action) => {
  switch (action.type) {
    case FIELD_RETRIEVE_REQUEST:
      return {
        ...state,
        loading: true,
        connectionFailed: false,
      };
    case FIELD_RETRIEVE_SUCCESS:
      return {
        ...state,
        list: action.fields,
        loading: false,
        connectionFailed: false,
      };
    case FIELD_RETRIEVE_FAILURE:
      return {
        ...state,
        list: action.fields,
        loading: false,
        connectionFailed: false,
      };
    case CONNECTION_FAILED:
      return {
        ...state,
        loading: false,
        connectionFailed: true,
      }; 
    case CLEAR_FIELDS:
      return {
        ...state,
        list: [],
      };     
    default:
      return state;
  }
};
