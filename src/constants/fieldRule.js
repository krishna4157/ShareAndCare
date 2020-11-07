import _ from 'lodash';

export const frFieldTypes = {
    // txt: 
    // txtarea: 
    num: 'num',
    singleslct: 'singleslct',
    multislct: 'multislct',
    date: 'date',
    datetime: 'date',
    datetime12: 'date',
    datetime24: 'date',
    yesno: 'singleslct',
    yesnona: 'singleslct',
    // instruct,
    ps: 'num',
    // nrs,
    // vas,
    clkimg: 'multislct',
};

export const validateFieldRule = {
    singleslct: {
        eqls: (field, fieldRule) => field.crfData.optionOid === JSON.parse(fieldRule.value1)[0] ? true : false,
        noteqls: (field, fieldRule) => field.crfData.optionOid !== JSON.parse(fieldRule.value1)[0] ? true : false,
        in: (field, fieldRule) =>  _.includes(JSON.parse(fieldRule.value1), field.crfData.optionOid) ? true : false,
        notin: (field, fieldRule) => !_.includes(JSON.parse(fieldRule.value1), field.crfData.optionOid) ? true : false,
    },
    multislct: {
        eqls: (field, fieldRule) => eqlsMultiSelect(JSON.parse(fieldRule.value1), JSON.parse(field.crfData.optionOid)),
        noteqls: (field, fieldRule) => notEqlsMultiSelect(JSON.parse(fieldRule.value1), JSON.parse(field.crfData.optionOid)),
        in: (field, fieldRule) =>  inMultiSelect(JSON.parse(fieldRule.value1), JSON.parse(field.crfData.optionOid)),
        notin: (field, fieldRule) => notInMultiSelect(JSON.parse(fieldRule.value1), JSON.parse(field.crfData.optionOid)),
    },
    date: {
        eqls: (field, fieldRule) => new Date(field.crfData.fieldValue) === new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        noteqls: (field, fieldRule) => new Date(field.crfData.fieldValue) !== new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        range: (field, fieldRule) =>  new Date(field.crfData.fieldValue) <= new Date(fieldRule.value2)
                                        && new Date(field.crfData.fieldValue) >= new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        lsr: (field, fieldRule) => new Date(field.crfData.fieldValue) < new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        gtr: (field, fieldRule) => new Date(field.crfData.fieldValue) > new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        lsreqls: (field, fieldRule) => new Date(field.crfData.fieldValue) <= new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
        gtreqls: (field, fieldRule) => new Date(field.crfData.fieldValue) >= new Date(JSON.parse(fieldRule.value1)[0]) ? true : false,
    },
    num: {
        eqls: (field, fieldRule) => field.crfData.fieldValue === JSON.parse(fieldRule.value1)[0] ? true : false,
        noteqls: (field, fieldRule) => field.crfData.fieldValue !== JSON.parse(fieldRule.value1)[0] ? true : false,
        range: (field, fieldRule) =>  field.crfData.fieldValue <= fieldRule.value2
                                        && field.crfData.fieldValue >= JSON.parse(fieldRule.value1)[0] ? true : false,
        lsr: (field, fieldRule) => field.crfData.fieldValue < JSON.parse(fieldRule.value1)[0] ? true : false,
        gtr: (field, fieldRule) => field.crfData.fieldValue > JSON.parse(fieldRule.value1)[0] ? true : false,
        lsreqls: (field, fieldRule) => field.crfData.fieldValue <= JSON.parse(fieldRule.value1)[0] ? true : false,
        gtreqls: (field, fieldRule) => field.crfData.fieldValue >= JSON.parse(fieldRule.value1)[0] ? true : false,
    },
    // instruct: {},
    // ps: {},
    // nrs: {},
    // vas: {},
}

const eqlsMultiSelect = (fieldRuleValues, enteredValues) => {
    if(enteredValues.length === 1) {
        return enteredValues[0] === fieldRuleValues[0] ? true: false;
    }
    return false;
}

const notEqlsMultiSelect = (fieldRuleValues, enteredValues) => {
    if(enteredValues.length === 1) {
        return enteredValues[0] !== fieldRuleValues[0] ? true: false;
    }
    return false;
}

const inMultiSelect = (fieldRuleValue, enteredValue) => enteredValue.every(value => fieldRuleValue.includes(value)) ? true : false;
const notInMultiSelect = (fieldRuleValue, enteredValue) => !enteredValue.some(value => fieldRuleValue.includes(value)) ? true : false;