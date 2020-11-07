import React, { Component } from 'react';
import { Dimensions, View, Platform } from 'react-native'
import { dateFieldStyle } from './styles';
import DatePicker from 'react-native-datepicker';
import WebDateInput from '../webDatePicker/WebDateInput';
import RNDateTimePicker from '../appDatePicker/RNDateTimePicker';


export class DateInput extends Component{
    state={
        date: null,
    };

    componentDidMount() {
        this.setInitialDateValue();
    }

    setInitialDateValue = () => {
    const { field: { crfData } } = this.props;
       this.setState({
        date: crfData && crfData.fieldValue ? crfData.fieldValue : null,
       }) 
    }

    changeDate = (date) => {
        const { form, field: { id } } = this.props;
        const { setFieldsValue, getFieldsValue } = form;
        this.setState({date});
        setFieldsValue({
            ...getFieldsValue(),
            [id]: date,
        });
    }

    render() {
        const { field: { crfData, id, isRequired }, t } = this.props;
        const { date } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
            {this.props.form.getFieldDecorator(`${id}`,{
                initialValue: crfData && crfData.fieldValue ? crfData.fieldValue : null,
                rules: [{
                    required: isRequired,
                    message: t('DateValMsg'),
                    whitespace: true,
                    }],
            })(Platform.OS !== 'web' ? <RNDateTimePicker
                    mode="date"
                    placeHolder={t('SelectDate')}
                    onChange={this.changeDate}
                    value={date}
            /> : <WebDateInput
                    date={this.state.date}
                    onDateChange={this.changeDate}
                    format="dd-MMM-yyyy"
                    showTimeInput={false}
                    timeFormat="HH:mm"
                    placeHolder={t('SelectDate')}
                    valueFormat="DD-MMM-YYYY"
                /> )}
        </View>
        )
    }
}
