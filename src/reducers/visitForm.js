import {SELECT_VISIT_FORM} from '../actions/visitForm';

import initialState from '../store/initialState';


const visitForm = (state = initialState.visitForm, action) => {
  switch (action.type) {
    case SELECT_VISIT_FORM:
    return {
      ...state,
      selectedVisitFormOid: action.visitFormOid,
    };
    default:
      return state;
  }
};

export default visitForm;