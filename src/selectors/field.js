import { createSelector } from 'reselect';
import _ from 'lodash';

const getFieldsList = (state) => state.field.list;

const getOfflineData = (state) => state.subjectStudyMetaData;

const getselectedVisitFormOid = (state) => state.visitForm.selectedVisitFormOid;

export const getFields = createSelector(
    [getFieldsList],
    (fieldsList) => {
      const fields = fieldsList.map(field => ({
          ...field,
          dictionary: field.dictionary ? JSON.parse(field.dictionary) : null,
      }));
      return fields;
    },
  );

export const buildOfflineFields = createSelector(
  [getOfflineData, getselectedVisitFormOid],
  (data, visitFormOid) => {
    const selectedVisitForm = _.head(_.filter(_.head(data.study.visits).visitForms, (visitForm) => {
       return visitForm.visitFormOid === visitFormOid;
     }));
    const fields = _.map(_.head(selectedVisitForm.form.fieldGroups).fields, (field) => ({
       ...field,
       dictionary: field.dictionary ? JSON.parse(field.dictionary) : null,
     }))
     return _.sortBy(fields, ['ordinal']);
   }
)

export const buildOfflineFieldsWithOnlineData = createSelector(
  [getOfflineData, getselectedVisitFormOid, getFields],
  (data, visitFormOid, fields) => {
    if(fields.length > 0) {
      const selectedVisitForm = _.head(_.filter(_.head(data.study.visits).visitForms, (visitForm) => {
        return visitForm.visitFormOid === visitFormOid;
      }));
     const fieldsList = _.map(_.head(selectedVisitForm.form.fieldGroups).fields, (field) => {
      const loField = _.head(_.filter(fields, f=> f.fieldOid === field.fieldOid));
       return { 
        ...field,
        dictionary: field.dictionary ? JSON.parse(field.dictionary) : null,
        crfData: loField ? loField.crfData : null
      }})
      return _.sortBy(fieldsList, ['ordinal']);
    } return [];
  }
)