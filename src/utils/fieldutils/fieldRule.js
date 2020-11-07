import _ from 'lodash';
import { frFieldTypes, validateFieldRule } from '../../constants/fieldRule';

const checkFieldRule = (currentField) => {
    const fr = {
        satisfiedFieldRuleIndex: null,
    };
    currentField.fieldRules.every(fieldRule => {
        const fieldType = frFieldTypes[`${currentField.fieldType}`];
        if(validateFieldRule[`${fieldType}`][`${fieldRule.operator}`](currentField, fieldRule)) {
            fr.satisfiedFieldRuleIndex = currentField.fieldRules.indexOf(fieldRule);
            return false;
        } else {
            return true;
        }
    });
    return fr.satisfiedFieldRuleIndex;
};

const getNextField = (fieldList, currentField, satisfiedFrIndex) => {
    const nextField =  _.find(fieldList, field => 
         field.fieldOid === currentField.fieldRules[satisfiedFrIndex].destFieldOid
         && field.ordinal > currentField.ordinal );
     return nextField ? nextField.ordinal: null;
 };

 export const fetchNextFieldByFieldRule = (selectedField, fieldList) => {
    const satisfiedFieldRuleIndex = checkFieldRule(selectedField);
    if (satisfiedFieldRuleIndex !== null) {
        const nextOrdinal = getNextField(fieldList, selectedField, satisfiedFieldRuleIndex);
        return nextOrdinal;
    } 
    else {
        return null;
    }
 }