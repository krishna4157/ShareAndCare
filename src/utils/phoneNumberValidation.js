import {parsePhoneNumberFromString} from 'libphonenumber-js';
import _ from 'lodash';

export const validatePhoneNumber = (value) => {
    const valuePlusCallingCode = `+${value}`;
   
    const phoneNumber = parsePhoneNumberFromString (valuePlusCallingCode);
    if(phoneNumber==undefined){
      return false;
    }

    // alert(`${JSON.stringify(phoneNumber.isValid())}    ${value}`);
    else if(_.isEmpty(value)){
      return true
    }
    if (!phoneNumber.isPossible () === true) {
      return false
    }
    else if (valuePlusCallingCode.includes(' ')){
      return false
    } else {
        return true
    }
  };