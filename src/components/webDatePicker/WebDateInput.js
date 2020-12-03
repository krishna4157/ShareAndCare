import React, { useState } from "react";
import { Dimensions } from 'react-native';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { FcCalendar } from "react-icons/fc";
// import './WebDateInput.css';
import momentTz from 'moment-timezone';

const WebDateInput = ({onDateChange, date, format, showTimeInput, timeFormat, 
  placeHolder, valueFormat, isInitialValue, subjectTimezone}) => {
//   const [startDate, setStartDate] = useState(null);
// alert(date)

const formattedDate = date ? momentTz(date, "DD-MMM-YYYY hh:mm a z").format("DD-MMM-YYYY hh:mm a") : null
const {width:SCREEN_WIDTH} = Dimensions.get('window');
let datePickerClass;
if (SCREEN_WIDTH >= 1024) {
    datePickerClass = 'webdatepk15';
} else if (SCREEN_WIDTH >= 750) {
    datePickerClass = 'webdatepk22';
} else if (SCREEN_WIDTH > 350) {
    datePickerClass = 'webdatepk12';
} else {
    datePickerClass = 'webdatepk10';
}

  const CustomInput = ({ value, onClick,  }) => (
    <div
    className="dateInput"
      onClick={onClick}
    >
    <div style={{ display: "inline-block", 
    paddingRight: 10,}} >
      {/* <FcCalendar
       size="1.3em"
      /> */}
      </div>
      <div style={{ display: "inline-block" }} >
      
        { date || placeHolder }{ isInitialValue || !showTimeInput? "" : " "+subjectTimezone} 
        </div>
    </div>
  );
  return (
          <DatePicker
            selected={formattedDate ? new Date(formattedDate) : new Date()}
            onChange={(selectedDate) => {
              onDateChange(momentTz(selectedDate).format(valueFormat));
            }}
            customInput={<CustomInput />}
            dateFormat={format}
            timeFormat={timeFormat}
            timeInputLabel="Time:"
            // dateFormat="MM/dd/yyyy HH:mm"
            showTimeInput={showTimeInput}
            showMonthDropdown
            showYearDropdown
            placeholderText={placeHolder}
            className={datePickerClass}
          />
  );
};

export default WebDateInput;
