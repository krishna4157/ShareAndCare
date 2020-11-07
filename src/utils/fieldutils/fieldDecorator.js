import React, { Component } from 'react';
// import hideableView
import fieldTypes from '../../constants/fieldTypes';
// import { TextFieldDecorator } from '../../components/fields/TextInput';
// import { RadioFieldDecorator } from '../../components/fields/Radio';

const {
    TEXT,
    TEXTAREA,
    NUMBER,
    RADIO,
    CHECKBOX,
    DATE,
    DATETIME12,
    DATETIME24,
    YESNO,
    YESNONA,
    INSTRUCTION,
    PS,
    NRS,
    VAS,
    CLICKIMAGE
} = fieldTypes;

export default (fieldValue, field, svfId, crfVersionId) => {
    const { fieldType } = field;
    
        switch (fieldType) {
            case TEXT:
            case TEXTAREA:
            case NUMBER:
            case DATE:
            case DATETIME12:
            case DATETIME24:
            case PS:
            case NRS:
            case VAS:
                return {
                        ...field.crfData,
                        field: {
                            id: field.id,
                            fieldOid: field.fieldOid
                        },
                        fieldValue,
                        fieldOid: field.fieldOid,
                        optionOid: '',
                        subjectVisitForm: {
                            id: svfId,
                        },
                        crfVersion: {
                            id: crfVersionId,
                        }
                }
            case RADIO:
            case YESNO:
            case YESNONA:
                const oids = field.dictionary.options.filter(option => option.oid === fieldValue); 
                const fieldV = oids.length > 0 ? oids[0].value : null;
                return { 
                        ...field.crfData,
                        field: {
                            id: field.id,
                            fieldOid: field.fieldOid
                        },
                        fieldValue: fieldV,
                        fieldOid: field.fieldOid,
                        optionOid: fieldValue,
                        subjectVisitForm: {
                            id: svfId,
                        },
                        crfVersion: {
                            id: crfVersionId,
                        }
                }
            case CHECKBOX:
                return {
                        ...field.crfData, 
                        field: {
                            id: field.id,
                            fieldOid: field.fieldOid
                        },
                        fieldValue: JSON.stringify(field.dictionary.options.filter(option => fieldValue && fieldValue.indexOf(option.oid) !== -1)
                                    .map(option => option.value)),
                        fieldOid: field.fieldOid,
                        optionOid: JSON.stringify(fieldValue),
                        subjectVisitForm: {
                            id: svfId,
                        },
                        crfVersion: {
                            id: crfVersionId,
                        }
                }
            // case DATE || DATETIME12 || DATETIME24:
            //     return {
            //         crfData: {
            //             field: {
            //                 id: field.id,
            //                 fieldOid: field.fieldOid
            //             },
            //             fieldValue: fieldValue,
            //             fieldOid: field.fieldOid,
            //             optionOid: '',
            //         }
            //     }
            // case INSTRUCTION:
            //     return getFieldDecorator(`${index}fv`)(fieldComponent);
        //     case PS:
        //     return {
        //         ...field.crfData,
        //         field: {
        //             id: field.id,
        //             fieldOid: field.fieldOid
        //         },
        //         fieldValue,
        //         fieldOid: field.fieldOid,
        //         optionOid: '',
        //         subjectVisitForm: {
        //             id: svfId,
        //         }
        // }
            // case NRS:
            //     return getFieldDecorator(`${index}fv`)(fieldComponent);
            // case VAS:
            //     return getFieldDecorator(`${index}fv`)(fieldComponent);
            // case CLICKIMAGE:
            //     return getFieldDecorator(`${index}fv`)(fieldComponent);
            default:            
                return null;  
        }
    
}

export const placeFieldValue = (field, fieldValue) => {
    const { fieldType } = field;
    
        switch (fieldType) {
            case TEXT:
            case TEXTAREA:
            case NUMBER:
            case DATE:
            case DATETIME12:
            case DATETIME24:
            case PS: 
            case NRS:
            case VAS:
                return {
                        ...field,
                        crfData: {
                            ...field.crfData,
                            fieldValue,
                            optionOid: '',
                        }
                }
            case RADIO:
            case YESNO:
            case YESNONA:
                const oids = field.dictionary.options.filter(option => option.oid === fieldValue); 
                const fieldV = oids.length > 0 ? oids[0].value : null;
                return {
                        ...field,
                        crfData: {
                            ...field.crfData,
                            fieldValue: fieldV,
                            fieldOid: field.fieldOid,
                            optionOid: fieldValue,
                        } 
                }
            case CHECKBOX:
                return {
                        ...field,
                        crfData: {
                            ...field.crfData, 
                            fieldValue: JSON.stringify(field.dictionary.options.filter(option => fieldValue && fieldValue.indexOf(option.oid) !== -1)
                                        .map(option => option.value)),
                            fieldOid: field.fieldOid,
                            optionOid: JSON.stringify(fieldValue),
                        }
                        
                }
            default:            
                return null;  
        }
    
}
