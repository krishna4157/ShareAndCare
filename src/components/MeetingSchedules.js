import React from 'react';
import { View, Card, Text } from "native-base";
import Timeline from 'react-native-timeline-flatlist';
import moment from 'moment-timezone';
import {Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { getMeetingsList } from '../utils/meetingScheduleUtils';

const buildTimelineItem = (rowData) => {
    return (
        <View style={{flex:1,borderRadius:5 }}>
            <Text style={{textAlign:'left',alignSelf:'flex-start',paddingLeft:10}}>{rowData.title}</Text>
        </View>                       
    )
};

const fromTimeToTime = (rowData) => {
    return <View style={{ justifyContent: 'center', height: 30 }}>
        <Text style={{ fontSize: 12.5 }}>{rowData.fromTime}</Text>
        <Text style={{ fontSize: 12.5 }}>{rowData.toTime}</Text>
        </View>
}

const checkDate=(rowDate)=>{
    var  date  = moment().format('ddd MMM DD');
    if(rowDate == date){
        return '#0080FF';
    } else {
        return '#e0e0e0';
    }
}

const checkDateText=(rowDate)=>{
    var  date  = moment().format('ddd MMM DD');
    if(rowDate == date){
        return 'white';
    } else {
        return 'black';
    }
}

export default class MeetingSchedule extends React.Component {
    constructor(){
        super()

    }

    _renderFooter = () => {
        const { loadingMore } = this.props;
        if (!loadingMore) return <View/>;

        return (
            <View
            style={{
                position: 'relative',
                width: '100%',
                height: 20,
                paddingVertical: 20,
                borderTopWidth: 1,
                marginTop: 10,
                marginBottom: 10,
            }}
            >
            <ActivityIndicator animating size="large" color='#0d47a1'/>
            </View>
        );
    };

    renderListEmptyComponent = () => {
        const { noCallsMessage } = this.props;
        return (
            <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{noCallsMessage}</Text>
            </View>
        )
    }

    render(){
        const { screenProps: { t }, noCallsMessage, fetchMoreCallSchedules, loading, refresh, timeZone } = this.props;
        let { callSchedules } = this.props;
        let {height, width} = Dimensions.get('window');
        callSchedules = getMeetingsList(callSchedules, timeZone);
        // if (!loading && callSchedules.length === 0) {
        //     return (
        //         <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
        //             <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{noCallsMessage}</Text>
        //         </View>
        //     )
        // }
        return (
            <View style={{flex:1, padding: 10}}>
            {loading && (
              <View
                style={{
                  height: height - height * (1 / 4),
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator
                  size="large"
                  color='#0d47a1'
                  animating={true}
                  key={loading ? "loading" : "not-loading"}
                />
              </View>
            )}
                {!loading && <FlatList
                    data={callSchedules}
                    onEndReached={fetchMoreCallSchedules}
                    onEndReachedThreshold={0.5}
                    onRefresh={refresh}
                    refreshing={loading}
                    ListEmptyComponent={this.renderListEmptyComponent}
                    // ListFooterComponent={this._renderFooter}
                    renderItem={({ item: callSchedule }) => 
                    <Card style={{flex:1,borderRadius:5}}>
                        <View style={{borderTopRightRadius:5, borderTopLeftRadius:5, backgroundColor:checkDate(callSchedule[0].date),padding:3, paddingVertical: 5       }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign:'center',alignSelf:'flex-start',paddingLeft:10,color:checkDateText(callSchedule[0].date)}}>{callSchedule[0].date}</Text>
                        </View>
                        <View style={{flex:1,marginTop:10, paddingHorizontal: 10}}>
                            <Timeline
                            separator={true}
                            style={{marginTop:10}}
                            separatorStyle={{marginRight:30,backgroundColor: "grey"}}
                            // innerCircle={'dot'}
                            
                            lineColor='rgb(45,156,219)'
                            lineWidth={0.8}
                            lineHeight={0.2}
                            dotSize={90}
                            circleColor={'white'}
                            // timeStyle={{color:checkDateText(obj[0].date)}}
                            descriptionStyle={{color:'gray'}}
                            data={callSchedule}
                            renderTime={(rowData) => fromTimeToTime(rowData)}
                            renderDetail={(rowData) => buildTimelineItem(rowData,callSchedule)}
                            innerCircle={'icon'}
                        />
                        </View>
                    </Card>}
                />}
            </View>
        )
    }
}
