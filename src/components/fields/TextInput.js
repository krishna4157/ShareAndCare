import React, { Component } from 'react';
import { StyleSheet, View, TextInput as TxtInput} from 'react-native'
// import { View } from 'native-base';
// import { TextareaItem } from '@ant-design/react-native';
// import { InputItem } from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';


import { styles } from './styles';

export class TextInput extends Component{
    state={};
    
    changeFieldValue = (value) => {
        const { form, field: { id } } = this.props;
        const { setFieldsValue, getFieldsValue } = form;
        setFieldsValue({
            ...getFieldsValue(),
            [id]: value,
        });
    }

    render() {
        const { field: { crfData, id, isRequired }, t } = this.props;
        return (
            <View style={{ marginHorizontal: 10 }}>
            {this.props.form.getFieldDecorator(id,{
                initialValue: crfData ? crfData.fieldValue : null,
                rules: [{
                required: isRequired,
                message: t('TextValMsg'),
                }],
            })(<TxtInput
                placeholder={t('EnterHere')}
                onChangeText={this.changeFieldValue}
                value={this.props.form.getFieldValue(id)}
                // rows={10}
                // autoHeight={true}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderBottomWidth: 2,
                    borderBottomColor: '#64b5f6',
                }}
                />)}
            </View>
        )
    }
}