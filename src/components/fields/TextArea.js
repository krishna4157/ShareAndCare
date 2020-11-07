import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native'
// import { View } from 'native-base';
// import { TextareaItem } from '@ant-design/react-native';
// import { TextareaItem } from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';


import { styles } from './styles';

export class TextArea extends Component{
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
            })(<TextInput
                placeholder={t('EnterHere')}
                onChangeText={this.changeFieldValue}
                value={this.props.form.getFieldValue(id)}
                // clear
                // rows={10}
                multiline={true}
                style={[{ height: 100 }, styles.textArea, styles.textBoxBorderColor]}
                // style={[styles.inputTextFont, styles.textArea, styles.textBoxBorderColor]}
                />)}
            </View>
        )
    }
}