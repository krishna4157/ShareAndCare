import _ from 'lodash';
import moment from 'moment-timezone';
import { wrapFieldType } from './fieldType';
import placeFieldValues from './fieldDecorator';
import { wrapHidableView } from './hideableView';
import { fetchNextFieldByFieldRule } from './fieldRule';
import { placeFieldValue } from './fieldDecorator';
import Constants from '../../constants/constants';

export const renderFields = (fieldList, currentOrdinal, fields) => {
  const fieldComponents = [];
  for (let i = 0; i < fieldList.length; i++) {
    fieldComponents.push(wrapHidableView(fields[i], fieldList[i], currentOrdinal));
  }
  return fieldComponents;
}

export const buildFields = (fieldList, form, t, subjectTimezone) => {
  const fields = [];
  const fieldData = form.getFieldsValue();
  fieldList.forEach((field) => fields.push(wrapFieldType(field, form, t, subjectTimezone)));
  return fields;
}

export const createFieldsToSubmit = (subjectVisitId,fieldValues, fieldsList, selectedSvf, navigatedOrdinals) => {
  const crfData = [];
  fieldsList.forEach(field => {
    if(_.includes(navigatedOrdinals, field.ordinal) || fieldsList.length === 1) {
      crfData.push(placeFieldValues(fieldValues[field.id], field, selectedSvf.svfId,selectedSvf.crfVersionId ));
    } else {
      crfData.push({
        ...field.crfData,
        field: {
            id: field.id,
            fieldOid: field.fieldOid
        },
        fieldOid: field.fieldOid,
        subjectVisitForm: {
          id: selectedSvf.svfId,
        },
        crfVersion:{
          id: selectedSvf.crfVersionId,
        },

      });
    }
    
  });

  const time = selectedSvf.scheduleTime !== Constants.AllDay ? moment(selectedSvf.scheduleTime, "hh:mm A").format("HH:mm:ss") : null;
  return {
    id: selectedSvf.svfId,
    subjectVisit:{
      id:subjectVisitId
    },
    originatingTimezone: moment.tz.guess(true),
    visitFormOid: selectedSvf.visitFormOid,
    scheduleDate: moment(new Date(selectedSvf.scheduleDate)),
    completedDateTime:moment(new Date()).format(),
    scheduleTime: time,
    crfVersion:{
      id: selectedSvf.crfVersionId,
    },
    crfData
  };
}

const changeToDefaultNextFieldOrdinal = (selectedField, fieldList) => (
  fieldList[_.findIndex(fieldList, field => (field.id === selectedField.id))+1].ordinal
);

const changeToDefaultPreviousFieldOrdinal = (selectedField, fieldList) => (
  fieldList[_.findIndex(fieldList, field => (field.id === selectedField.id))+1].ordinal
);

export const changeToNextFieldOrdinal = (selectedField, fieldList, fieldValue) => {
  try {
    const currentField = placeFieldValue(selectedField, fieldValue);
    return fetchNextFieldByFieldRule(currentField, fieldList) || changeToDefaultNextFieldOrdinal(selectedField, fieldList);
  } catch (error) {
    console.log(error);
    return changeToDefaultNextFieldOrdinal(selectedField, fieldList);
  }
};

export const changeToPreviousFieldOrdinal = (selectedField, fieldList) => {
  try {
    return changeToDefaultPreviousFieldOrdinal(selectedField, fieldList)
  } catch (error) {
    return changeToDefaultPreviousFieldOrdinal(selectedField, fieldList);
  }
};

export const changeSelectedFieldToNextField = (currentOrdinal, fieldList) => {
  const selectedField = _.find(fieldList, field => field.ordinal === currentOrdinal);
  return selectedField;
};

export const changeSelectedFieldToPreviousField = (lastOrdinal, fieldList) => (
  _.find(fieldList, field => (field.ordinal === lastOrdinal))
);

export const disableNextButton = (currentOrdinal, fieldList) => {
  if (fieldList.length <= 1)
    return true;
  return currentOrdinal === fieldList[fieldList.length - 1].ordinal ? true : false
}

export const disablePreviousButton = (currentOrdinal, fieldList) => {
  return currentOrdinal === fieldList[0].ordinal ? true : false
}

export const checkIfTheFieldsShouldBeValidated = (fieldList, navigationOrdinals, errorFields) => {
  if(errorFields) {
    const errorFieldsKeys = _.keysIn(errorFields);
    const filteredErrorFields = fieldList.filter(field => errorFieldsKeys.includes(field.id));
    const fieldsToBeValidated = filteredErrorFields.filter(field => navigationOrdinals.includes(field.ordinal));
    return fieldsToBeValidated.length > 0 ? false : true;
  }
  return true;
  
}
