import { combineReducers } from "redux";
import changeLanguage from "./changelanguage";
import subjectVisitForm from "./subjectVisitForm";
// import NavigationReducer from "./NavReducer";
import field from "./field";
import crfData from "./crfData";
import subject from "./subject";
import faq from "./faq";
import loading from "./loading";
import timeZone from './timeZone';
import subjectStudyMetaData from './subjectStudyMetaData';
import visitForm from './visitForm';
import appStatus from './storeAppStatus';
import healthKitData from './healthKitdata';
import deviceLocation from './deviceLocation';
import chat from './chat';

const AppReducer = combineReducers({
  subject,
  changeLanguage,
  subjectVisitForm,
  field,
  crfData,
  faq,
  loading,
  // NavigationReducer,
  timeZone,
  subjectStudyMetaData,
  visitForm,
  appStatus,
  healthKitData,
  deviceLocation,
  chat
});

export default AppReducer;