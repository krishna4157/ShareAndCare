import {localeStore} from '../utils/localization/localizationUtils';
import createActionType from '../utils/action';

export const CHANGE_LANGUAGE_SUCCESS = "CHANGE_LANGUAGE_SUCCESS";
export const REMOVE_SELECTED_LANGUAGE = createActionType('REMOVE_SELECTED_LANGUAGE')


const changeLanguageSuccess = (language) => ({
    type: CHANGE_LANGUAGE_SUCCESS,
    value: language,
});

export const changeLanguage = (language, changeLang) => dispatch => {
    changeLang(language);
    dispatch(changeLanguageSuccess(language));
}

export const clearSelectedLanguage = () => ({
    type: REMOVE_SELECTED_LANGUAGE,
    value: null,
});