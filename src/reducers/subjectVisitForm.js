import {
  SVFS_RETRIEVE_SUCCESS,
  SVFS_RETRIEVE_REQUEST,
  SVFS_RETRIEVE_FAILURE,
  SVF_RETRIEVE_SUCCESS,
  SVF_RETRIEVE_REQUEST,
  SVF_RETRIEVE_FAILURE,
  SVFSLIST_RETRIEVE_REQUEST,
  SVFSLIST_RETRIEVE_SUCCESS,
  SVFSLIST_RETRIEVE_FAILURE,
  STORE_SELECTED_SVF
} from '../actions/subjectVisitForm';
import initialState from '../store/initialState';

export default (state = initialState.subjectVisitForm, action) => {
  switch (action.type) {
    case SVFS_RETRIEVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SVFS_RETRIEVE_SUCCESS:
      return {
        ...state,
        list: action.svfs,
        loading: false,
      };
    case SVFS_RETRIEVE_FAILURE:
      return {
        ...state,
        loading: false,
      };
      case SVFSLIST_RETRIEVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SVFSLIST_RETRIEVE_SUCCESS:
      return {
        ...state,
        allSvfs: action.svfs,
        loading: false,
      };
    case SVFSLIST_RETRIEVE_FAILURE:
      return {
        ...state,
        loading: false,
      };  
    case SVF_RETRIEVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SVF_RETRIEVE_SUCCESS:
      const newSvfs = {};
      newSvfs[action.svf.id] = {
        ...state.allSvfs[action.svf.id],
        filled: action.svf.filled,
        completedDateTime: action.svf.completedDateTime
      };
      return {
        ...state,
        loading: false,
        allSvfs: Object.assign({}, state.allSvfs, newSvfs),
      };
    case SVF_RETRIEVE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case STORE_SELECTED_SVF:
      return {
        ...state,
        selectedSvf: action.svf,
      }  
    default:
      return state;
  }
};
