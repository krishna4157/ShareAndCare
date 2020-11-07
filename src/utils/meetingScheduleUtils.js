import React from 'react';
import momentTz from 'moment-timezone';
import moment from 'moment';
import { Image } from 'react-native';
import _ from 'lodash';

const getDateTimeInGivenTz = (date, time, timezone) => {
    const dateTimeInGivenTz = momentTz.tz(`${date} ${time}`, timezone);
    // alert("timezoneDate time: "+dateTimeInGivenTz);
    return dateTimeInGivenTz;
}

const getLocalTime = (dateTimeInGivenTz, timeZone) => {
    // const currentTz = momentTz.tz.guess(true);
    const localTime = dateTimeInGivenTz.clone().tz(timeZone).format('hh:mm A');
    return localTime;
}

const getLocalDate = (dateTimeInGivenTz, dateFormat, timeZone) => {
    // const currentTz = momentTz.tz.guess(true);
    const localTime = dateTimeInGivenTz.clone().tz(timeZone).format(dateFormat);
    // alert(localTime);
    return localTime;
}

const calcToTime = (fromTime, duration) => {
    const date = moment().format('DD-MM-YYYY');
    // alert(fromTime);
    let toTime = moment(`${date} ${fromTime}`, 'DD-MMM-YYYY HH:mm').add(duration, 'm').format('hh:mm A');
    // toTime = `${fromTime} ${duration}`
    // alert("to time:"+ toTime);
    // toTime = momentTz(`2020-08-22 ${fromTime}`).format('hh:mm A');
    // alert("to time: "+toTime);
    return toTime;
}

const iconForCalltype=(type)=>{
    const videoCall = require('../../images/videoCamera.png');
    const PhoneCall = require('../../images/PhoneIcon.png')
    if(type==="VIDEO"){
        return <Image
            style={{width: 30, height: 30,overflow:'visible'}}
            source={videoCall}
        />
    }
    return <Image
        style={{width: 20, height: 20,overflow:'visible'}}
        source={PhoneCall}
    />
}

export const getMeetingsList = (callSchedules, timeZone) => {
    const callSchedulesInLocalTime = callSchedules.map(cs => {
        const time = getLocalTime(getDateTimeInGivenTz(cs.date, cs.time, cs.timezone), timeZone);
        const dateFormat = "ddd MMM DD";
        const date = getLocalDate(getDateTimeInGivenTz(cs.date, cs.time, cs.timezone), dateFormat, timeZone);
        // alert("Time: "+time+ ". Date:"+date);
        return {
            ...cs,
            title: cs.title,
            date: date,
            fromTime: time,
            toTime: calcToTime(momentTz(time, "hh:mm A").format('HH:mm'), cs.duration),
            time: time,
            icon: iconForCalltype(cs.type),
        }
    });
    
    const callSchedulesGruopByDate = _.groupBy(callSchedulesInLocalTime, 'date');
    return Object.values(callSchedulesGruopByDate);
}

export const getTodayCallSchedule = (callSchedules, timeZone) => {
    return callSchedules.map(cs => {
        const time = getLocalTime(getDateTimeInGivenTz(cs.date, cs.time, cs.timezone), timeZone);
        const dateFormat = "DD-MMM-YYYY";
        const date = getLocalDate(getDateTimeInGivenTz(cs.date, cs.time, cs.timezone), dateFormat, timeZone);
        return {
            ...cs,
            title: cs.title,
            date: date,
            fromTime: time,
            toTime: calcToTime(momentTz(time, "hh:mm A").format('HH:mm'), cs.duration),
            time: time,
            eventType: 'CALL',
            scTimeSort: time ? momentTz(time, "hh:mm A").format('HH:mm:ss') : '00',
            callType: cs.type,
        }
    })
}