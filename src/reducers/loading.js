import {
    SUCCESS,
    REQUEST,
    FAILURE,
  } from '../actions/loading';
  import showToast from '../utils/toast';
  import initialState from '../store/initialState';
  
  export default (state = initialState.loading, action) => {
     if (action.type.match(/.*SUCCESS/)) {
        return false;
      } else if (action.type.match(/.*FAILURE/)) {
        showToast(action.message, 'danger', 3000);
        return false;
      } else if (action.type.match(/.*AILURE/)) {
        return false;
      } else if (action.type.match(/.*CONNECTION_FAILED/)) {
        showToast(action.message, 'warning', 5000);
        return false;
      }
      else if (action.type.match(/.*REQUEST/)) {
        return true;
      }
       else {
        return state;
      }
  };
  