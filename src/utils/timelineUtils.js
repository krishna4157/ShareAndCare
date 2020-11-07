import React from 'react';
import { View, Card, CardItem, Text, Body } from "native-base";
import { MaterialCommunityIcons, FontAwesome, Entypo,Foundation } from '@expo/vector-icons';
import moment from 'moment-timezone';
import * as Linking from 'expo-linking';
// import Timeline from 'react-native-timeline-listview';
import Timeline from 'react-native-timeline-flatlist'; 
import { Dimensions } from 'react-native'
import styles from '../components/styles/TimelineStyles';
import PhoneCallCard from '../components/PhoneCallCard';
export const TimeLineComponent = ({ navigation, svfs, screenProps: { t }, selectVisitForm: storeSelectedVisitForm, storeSelectedSvf, isDeviceOnline, timeZone }) => {
    return <Timeline
        style={styles.list}
        // renderFullLine
        data={svfs}
        circleSize={14}
        circleColor='#455a64'
        lineColor='#455a64'
        lineWidth={0.8}
        timeStyle={styles.timeStyle}
        options={{
            style: { paddingTop: 10 }
        }}
        innerCircle={'dot'}
        onEventPress={(item) => {
            if(item.eventType !== 'CALL') {
                storeSelectedVisitForm(item.visitFormOid);
                storeSelectedSvf({
                    svfId: item.svfId,
                    visitFormOid: item.visitFormOid,
                    formId: item.formId,
                    formName: item.title,
                    isFilled:item.filled,
                    scheduleDate: item.scheduleDate,
                    scheduleTime: item.time,
                    crfVersionId: item.crfVersionId,

                });
                setTimeout(() => navigation.navigate('Form', {
                    from: 'Diary',
                    formName: item.title,
                    isDeviceOnlineAtDiary: isDeviceOnline,
                }), 0);
            } else {    
                Linking.openURL(`https://epromeetut1.acs-eclinical.com/${item.accessCode}`);
            }
        }}
        titleStyle={styles.titleStyle}
        renderDetail={(rowData) => buildTimelineItem(rowData, t, timeZone)}
        renderTime={(rowData) => buildTimelineTime(rowData)}
    />
};

export const buildTimelineItem = (rowData, t, timeZone) => {
    return (
        <View>
        {rowData.eventType === 'FORM' &&
        <Card style={[styles.details, { backgroundColor: '#BFF4F8' }]}>
            <CardItem style={[styles.details, { backgroundColor: '#BFF4F8' }]}>
                <Body>
                    <View style={styles.header}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>{rowData.title}</Text>
                        </View>
                        { rowData.filled ?
                        <View style={styles.headerIconContainer}>
                            <Entypo name="check" size={24} color='#689f38'/>
                        </View> : <View/>
                        }
                    </View>
                    { rowData.filled ?
                    <Text style={styles.descriptionText}>{t('CompletedOn')} {"\n"}{moment(rowData.completedDateTime).tz(rowData.originatingTimezone).format('DD-MMM-YYYY hh:mm A z')}</Text>
                    : <View/>
                    }
                </Body>
            </CardItem>
        </Card>}
        {rowData.eventType === 'CALL' && <PhoneCallCard call={rowData} timeZone = {timeZone}/>}
        </View>
    )
};

export const buildTimelineTime = (rowData) => {
    return (
        <View style={{ width: 75, backgroundColor: 'rgba(13, 71, 161, .9)', height: 30, justifyContent: 'center', borderRadius: 10 }}>
        <Text style={{ fontSize: rowData.time.length > 9 && !rowData.time.includes(':') ? 9 : 13, alignSelf: 'center', color: 'white', fontFamily: 'Work_Sans', }}>{rowData.time}</Text>
        </View>
    )
};

