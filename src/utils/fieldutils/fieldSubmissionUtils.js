// import _ from 'lodash';
// import fieldTypes from '../../constants/fieldTypes';

// const {
//     TEXT,
//     // TEXTAREA,
//     NUMBER,
//     RADIO,
//     CHECKBOX,
//     DATE,
//     // DATETIME,
//     DATETIME12,
//     DATETIME24,
//     // YESNO,
//     // YESNONA,
//     // INSTRUCTION,
//     PS, 
//     // NRS,
//     // VAS, 
//     // CLICKIMAGE
// } = fieldTypes;

// export const buildCrfDataToSubmit = (fieldlist, fieldValues, svfId) => (
//     {
//         id: svfId,
//         crfData: buildCrfData(fieldlist, fieldValues, svfId)
// })

// const buildCrfData = (fieldlist, fieldValues, svfId) => {
//     const crfData = [];
//     const fvList = _.map(fieldValues,(fieldValue,id) => {
//           return {
//             fieldValue,
//             id,
//           }
//         });
//     _.forEach(_.zip(fieldlist, fvList), _.spread((field, value) => {
//         if (field.id === value.id) {
//             if ( field.fieldType )
//         }
//         crfData.push({

//         })
//      }));
// }