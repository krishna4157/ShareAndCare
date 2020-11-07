import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import momentTz from 'moment-timezone';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Container, View, Header, Content, Card, CardItem, Text, Body } from "native-base";
import {localeStore} from './localization/localizationUtils';
import styles from '../components/styles/EventCalendarStyles';

let bgColors = ['#ffecb3', '#bbdefb', '#ffccbc', '#fce4ec', '#f0f4c3', '#b2ebf2'];

export const buildCalendarData = (svfs) => {
    
    eventData = svfs.map((svf, index) => ({
                title: svf.visitForm.form.formName,
                bgColor: '',
                startTime: svf.scheduleTime ? moment(svf.scheduleTime, "HH:mm:ss").format('hh:mm A') : null,
                endTime: svf.scheduleTime ? moment(svf.scheduleTime, "HH:mm:ss").add(1, 'hours').format('hh:mm A'): null,
                allDay: svf.scheduleTime ? false : true,
                id: svf.id,
                visitFormId: svf.visitForm.id,
                formName: svf.visitForm.form.formName,
                formId: svf.visitForm.form.id,
                isFilled : svf.filled,
                setNumber : svf.setNumber,
                scheduleDate: svf.scheduleDate,
                completedDateTime: svf.completedDateTime,
                originatingTimezone: svf.originatingTimezone,
                scTimeSort: svf.scheduleTime ? moment(svf.scheduleTime, "HH:mm:ss").format('HH:mm:ss') : '00',

    }));
    let data = _.groupBy(eventData, event => event.scheduleDate);
    const dataKeys = _.keys(data);
    _.forEach(dataKeys, (key) => {
       _.update(data, key, (svfs) => {
        return _.sortBy(svfs, ['scTimeSort']).map((svf, index) => ({
            ...svf,
            bgColor: getBgColor(index),
        }));
       });
    });
    return data;
}

const getBgColor = (index) => {
    if(bgColors[index]) {
        return bgColors[index];
    } else {
        bgColors = [...bgColors, ...bgColors];
        getBgColor(index);
    }
}

export const buildMarkedDates = (svfs) => {
    const markedDates = {};
     svfs.forEach(svf => {
        markedDates[svf.scheduleDate] = {marked: true};
     });
     return markedDates;
}

export const loadItems = (month, ref) => {
    const { items } = ref.state;
      const newItems = {}
    newItems[month.dateString] = _.isEmpty(items) ? {} : items[month.dateString];
    ref.setState({selectedDateItems: newItems, selectedDate: month.dateString});
}

export const checkIfSvfsAreDifferent = (currentSvfs, prevSvfs) => {
    const diff = _.differenceBy(currentSvfs,prevSvfs);
    return diff.length > 0 ? true : false;
}

export const renderItem = (item, ref) => {
    const { navigation } = ref.props;
    return (
        <Card style={[styles.item, {backgroundColor: item.bgColor}]}>
        <CardItem style={[{backgroundColor: item.bgColor}]} button onPress={() => {setTimeout(() => {
            navigation.navigate('Form', {
                    svfId: item.id,
                    formId: item.formId,
                    formName: item.formName,
                    from: 'EventCalender'
                  })
        }, 0)}}>
        <Body>
            <View style={{ flex: 2 }}>
                <Text style={styles.eventText}>{item.formName}</Text>
            </View>
            <View style={{ flex: 4 }}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.eventTimeText]}>{ item.startTime ? `${item.startTime} - ${item.endTime}` : localeStore.tmlnallday}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    {/* {item.isFilled ? <View><FontAwesome name="check" size={20} color='#689f38'/><Text style={{
                        fontFamily: 'Work_Sans',
                        fontSize: 9,
                        color: '#000'
                    }}> Completed on {momentTz(item.completedDateTime).tz(item.originatingTimezone).format('DD-MMM-YYYY hh:mm A z')}
                    </Text>
                    </View>
                    : <View/> } */}
                </View>
            </View>
        </Body>
        </CardItem>
        </Card>
    );
}

export const renderEmptyDate = () => {
    return (
            <View style={styles.noEvent}>
                <Card style={[styles.item, { marginLeft: 10 }]}>
                    <CardItem>
                        <Body>
                            <Text style={[styles.eventTimeText, { alignSelf: 'center' }]}>{localeStore.NoEventsforDay}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </View>
    );
}

export const renderDay = (day) => {
    return (
        <View style={styles.dayContainer}>
            <View >
                <Text style={styles.day}>{day ? moment(day.timestamp).format("dddd") : ''}</Text>
            </View>
            <View>
            { day ?
                <Text style={moment(day.timestamp).format("MMM Do YY") === moment().format("MMM Do YY") ? [styles.date, {color: '#039be5'}] : styles.date}>{day ? `${day.day}th` : ''}</Text>
                : <Text></Text>
            }
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.monthAndYear}>{day ? moment(day.timestamp).format("MMM") : ''}{' '}</Text><Text style={styles.monthAndYear}>{day ? day.year.toString() : ''}</Text>
            </View>
        </View>
    );
}

export const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
}



