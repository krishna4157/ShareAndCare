import React, { Component } from 'react';
import { Dimensions, View, Platform } from 'react-native'
import { dateFieldStyle } from './styles';
import WebDateInput from '../webDatePicker/WebDateInput';

import DatePicker from 'react-native-datepicker';
import RNDateTimePicker from '../appDatePicker/RNDateTimePicker';

export class DateTime24 extends Component{
    state={
        date: null,
        isInitialValue: true
    };

    componentDidMount() {
        this.setInitialDateValue();
    }

    setInitialDateValue = () => {
    const { field: { crfData } } = this.props;
       this.setState({
        date: crfData && crfData.fieldValue ? crfData.fieldValue : null,
        isInitialValue: true
       }) 
    }

    changeDate = (date) => {
        const { form, field: { id }, subjectTimezone } = this.props;
        const { setFieldsValue, getFieldsValue } = form;
        this.setState({date});
        setFieldsValue({
            ...getFieldsValue(),
            [id]: date+" "+subjectTimezone,
        });
    }

    render() {
        const { field: { crfData, id, isRequired }, t, subjectTimezone } = this.props;
        const { isInitialValue, date } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
            {this.props.form.getFieldDecorator(`${id}`,{
                initialValue: crfData && crfData.fieldValue ? crfData.fieldValue : null,
                rules: [{
                    required: isRequired,
                    message: t('DateValMsg'),
                    whitespace: true,
                    }],
            })(Platform.OS !== 'web' ?  <RNDateTimePicker
                    mode="datetime24"
                    placeHolder={t('SelectDate')}
                    onChange={this.changeDate}
                    shortTimezone={subjectTimezone}
                    value={date}
            /> : <WebDateInput
                    date={this.state.date}
                    onDateChange={this.changeDate}
                    format="dd-MMM-yyyy HH:mm"
                    showTimeInput={true}
                    timeFormat="HH:mm"
                    placeHolder={t('SelectDate')}
                    valueFormat="DD-MMM-YYYY HH:mm"
                    isInitialValue={isInitialValue}
                    subjectTimezone={subjectTimezone}
                />
                )}
        </View>              
        )
    }
}
