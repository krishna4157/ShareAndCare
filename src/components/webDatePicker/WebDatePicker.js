import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import './DatePicker.css';

const WebDatePicker = ({onDateChange}) => {
  const [startDate, setStartDate] = useState(new Date());

  const CustomInput = ({ value, onClick }) => (
    <div
    className="dateInput"
      onClick={onClick}
    >
    <div style={{ display: "inline-block", 
    paddingRight: 10,}} >
      <FcCalendar
       size="1.1em"
      />
      </div>
      <div style={{ display: "inline-block" }} >
      
        {value}
        </div>
    </div>
  );
  return (
          <DatePicker
            selected={startDate}
            dateFormat="dd-MMM-yyyy"
            onChange={(date) => {
              setStartDate(date);
              onDateChange(date);
            }}
            customInput={<CustomInput />}
            showMonthDropdown
            showYearDropdown
          />
  );
};

export default WebDatePicker;
