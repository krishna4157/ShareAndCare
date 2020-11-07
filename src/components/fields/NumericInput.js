import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native'
import { View, Text  } from 'native-base';
// import { InputItem } from '@ant-design/react-native';

export class NumericInput extends Component{
    state={};
    
    changeFieldValue = (value) => {
        const { form, field: { id } } = this.props;
        const { setFieldsValue, getFieldsValue } = form;
        setFieldsValue({
            ...getFieldsValue(),
            [id]: value ? value.replace(/[^0-9]/g, '') : '',
        });
    }

    validateNumberRange = (rule, value, callBack) => {
        const { field: { dictionary: { range } }, t } = this.props;
        if ((Number(value) >= Number(range.min) && Number(value) <= Number(range.max)) || (value===null)) {
        callBack();
        } else {
        callBack(`${t('NumberValidate1')} ${range.min} ${t('NumberValidate2')} ${range.max}.`);
        }
    }

    render() {
        const { getFieldError } = this.props.form;
        
        const { field: { dictionary: { range }, crfData, id, isRequired }, t } = this.props;
        return (
            <View style={{ marginHorizontal: 10 }}>
            {this.props.form.getFieldDecorator(`${id}`,{
                type: 'number',
                initialValue: crfData ? crfData.fieldValue : null,
                rules: [{
                    required: isRequired,
                    message: t('ReqNumericField'),
                    },
                    {
                    validator: (rule, value, callback) => this.validateNumberRange(rule, value, callback),
                    }],
            })(<TextInput
                type="number"
                placeholder={t('EnterHere')}
                onChangeText={this.changeFieldValue}
                value={this.props.form.getFieldValue(id)}
                // maxLgetFieldErrorength={10}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderBottomWidth: 2,
                    borderBottomColor: '#64b5f6',
                }}
                />)}
                <Text style={{ paddingLeft: 15, paddingVertical: 7, color: '#0d47a1'}}>{getFieldError(id)}</Text>
            </View>
        )
    }
}