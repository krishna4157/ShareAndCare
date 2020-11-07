import {CHANGE_LANGUAGE_SUCCESS, REMOVE_SELECTED_LANGUAGE} from '../actions/changeLanguage';
import initialState from '../store/initialState';


const changeLanguage = (state = initialState.language, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE_SUCCESS:
      return {...state, selectedLanguage: action.value};
    case REMOVE_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage:action.value
      }
    default:
      return state;
  }
};

export default changeLanguage;
