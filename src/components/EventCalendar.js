
import React, { Component } from 'react';
import { Agenda } from 'react-native-calendars';
import { View } from 'native-base';
// import svfs from '../constants/CalendarEventData';
import {
    buildCalendarData,
    buildMarkedDates,
    loadItems,
    renderItem,
    renderEmptyDate,
    renderDay,
    rowHasChanged,
    checkIfSvfsAreDifferent
} from '../utils/eventCalendarUtils';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
import ActivityIndicator from './Loader';
import moment from 'moment';

export default class AgendaScreen extends Component {
    state = {
        items: {},
        selectedDateItems: {},
        markedDates: {},
        selectedDate: null,
    };

    static navigationOptions = {
        title: 'Event Calendar',
    };

    componentDidMount() {
        const { svfs, retrieveSvfsForASubject, selectedLanguage, subject } = this.props;
        if(true) {
            retrieveSvfsForASubject(subject, selectedLanguage)
        }
    }

    componentDidUpdate(prevProps) {
        const { svfs, retrieveSvfsForASubject, selectedLanguage, subject } = this.props;
        if (checkIfSvfsAreDifferent(svfs,prevProps.svfs)) {
            const eventsData = buildCalendarData(svfs);
            const markedDates = buildMarkedDates(svfs);
                this.setState({
                    items: eventsData,
                    markedDates,
                }, () => {
                    loadItems({
                        dateString: this.state.selectedDate || moment().format('YYYY-MM-DD'),
                    }, this);
                });
        } 
        if (selectedLanguage !== prevProps.selectedLanguage) {
            // retrieveSvfsForASubject(subject, selectedLanguage)
        }
        
    }

    render() {
        const { selectedDateItems, markedDates, items } = this.state;
        const { loading, retrieveSvfsForASubject, subject, selectedLanguage } = this.props;
        return (
            <Agenda
                items={selectedDateItems}
                onDayPress={(month) => loadItems(month, this)}
                onDayChange={(month) => loadItems(month, this)}
                selected={moment().format('YYYY-MM-DD')}
                renderItem={(item) => renderItem(item, this)}
                renderEmptyDate={() => {
                    return _.isEmpty(_.values(selectedDateItems)[0]) && loading ? <View /> : renderEmptyDate();
                }}
                rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}
                renderEmptyData={() => {
                    return _.isEmpty(items) && loading ? <View /> : renderEmptyDate()
                }}
                renderKnob={() => (<MaterialIcons name="drag-handle" color="#607d8b" size={30} />)}
                renderDay={(day, item) => renderDay(day)}
                markedDates={markedDates}
                // onRefresh={() => retrieveSvfsForASubject(subject, selectedLanguage)}
                style={{ height: 250 }}
            />
        );
    }
}