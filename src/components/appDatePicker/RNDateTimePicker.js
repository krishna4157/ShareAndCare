import React from 'react';
import { View,TextInput, Dimensions, Platform, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';
import momentTz from 'moment-timezone';
import DateTimePicker from '@react-native-community/datetimepicker';


class RNDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: new Date(),
          datetime: new Date(),
          showDatePicker: false,
          showTimePicker: false,
          formattedDate: '',
          formattedDateTime: '',
        }
        
    }

    generateDate = () => {
      const { date } = this.state;
      const { mode, onChange, shortTimezone } = this.props;
      let formattedDateTime = ''
      if(mode === 'datetime12') {
        formattedDateTime = moment(date).format("DD-MMM-YYYY hh:mm A");
        formattedDateTime = formattedDateTime + " " + shortTimezone;
      } else if (mode === 'datetime24') {
        formattedDateTime = moment(date).format("DD-MMM-YYYY HH:mm");
        formattedDateTime = formattedDateTime + " " + shortTimezone;
      } else {
        formattedDateTime = moment(date).format("DD-MMM-YYYY");
      }
      this.setState({
        formattedDateTime,
      })
      onChange(formattedDateTime);
    }

    generateDateAndTime = () => {
      const { datetime, date } = this.state;
      const { mode, shortTimezone, onChange } = this.props;
      let formattedDate = ''
      let formattedTime = ''
      let formattedDateTime = ''
      if(mode === 'datetime12') {
        formattedDate = moment(date).format("DD-MMM-YYYY");
        formattedTime = moment(datetime).format("hh:mm A");
        formattedDateTime = formattedDate + " " + formattedTime + " " + shortTimezone;
      } else if (mode === 'datetime24') {
        formattedDate = moment(date).format("DD-MMM-YYYY");
        formattedTime = moment(datetime).format("hh:mm A");
        formattedDateTime = formattedDate + " " + formattedTime + " " + shortTimezone;
      }  
      this.setState({
        formattedDateTime,
      })
      onChange(formattedDateTime);
    }


    onDateChange = (value) => {
      const { mode } = this.props;
      let date = value.nativeEvent.timestamp 
      date = date ? new Date(date) : new Date();
      this.closeDatePicker();
      this.setState({
        date,
      }, () => {
        this.generateDate();
      })
      if(mode === 'datetime12' || mode === 'datetime24') {
        this.openTimePicker();
      }
    }

    onTimeChange = (value) => {
      let datetime = value.nativeEvent.timestamp 
      datetime = datetime ? new Date(datetime) : new Date();
      this.closeTimePicker();
      this.setState({
        datetime,
      }, () => {
        this.generateDateAndTime()
      })
      
    }

    openDatePicker = () => {
      this.setState({
        showDatePicker: true,
      })
    }

    openTimePicker = () => {
      this.setState({
        showTimePicker: true,
      })
    }

    closeDatePicker = () => {
      this.setState({
        showDatePicker: false,
      })
    }

    closeTimePicker = () => {
      this.setState({
        showTimePicker: false,
      })
    }
   
      
    render(){
        const { date, showDatePicker, datetime, showTimePicker, formattedDateTime } = this.state;
        const { mode, placeHolder, value } = this.props;
        return (
            <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => { this.openDatePicker() }}
              style={{
                backgroundColor: '#cfd8dc',
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width - 50,
                paddingVertical: 10,
                borderRadius: 5
              }}
            >
              <Text style={{ color: '#37474f', fontWeight: 'bold'}}> { value || placeHolder }</Text>
            </TouchableOpacity>
               {showDatePicker &&  <DateTimePicker
                testID="datePicker"
                value={date}
                mode={'date'}
                display={'default'}
                onChange={this.onDateChange}
              /> }

                {showTimePicker && <DateTimePicker
                testID="dateTimePicker"
                value={datetime}
                mode={'time'}
                is24Hour={mode === 'datetime24'}
                display={'default'}
                onChange={this.onTimeChange}
                /> }

            </View>
        );
    }
}

export default RNDateTimePicker;

RNDateTimePicker.defaultProps = {
  mode: 'date',
  shortTimezone: momentTz.tz(momentTz.tz.guess(true)).format('z'),
  onChange: () => { },
  placeHolder: 'Select Date'
}