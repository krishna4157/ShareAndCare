import React, { Component } from "react";
import {  bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
import api from '../utils/api';
import { serializeQuery } from '../utils/paginationUtils';
import MeetingSchedules from "../components/MeetingSchedules";
import showToast from '../utils/toast';

import { getDateBySubjectTimezone } from "../utils/dateFormatUtils";

class PastCallsScreen extends Component {
    state={
        callSchedules:[],
        page: 0,
        loading: false,
        loadingMore: false
    };

    componentDidMount() {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.retrieveCallSchedules();
        }
    }

    componentDidUpdate(prevProps) {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline !== prevProps.isDeviceOnline && isDeviceOnline) {
            this.retrieveCallSchedules();
        }
    }

    fetchMoreCallSchedules = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState(
            prevState => ({
                page: prevState.page + 1,
                loadingMore: true,
            }),
            () => {
                    this.retrieveCallSchedules();
            },
            );
        }
    };
    
    retrieveCallSchedules = async (isRefresh) => {
        const { subject: { id: subjectId, timeZone }, screenProps: { t } } = this.props;
        const { page, loadingMore } = this.state;
        const paginationParameters = {
            size: 15,
            page: isRefresh ? 0 : page,
        };

        const currentDate = getDateBySubjectTimezone(timeZone);
        try{
            if(!loadingMore) {
                this.setState({
                    loading: true,
                })
            }
            const res = await api.get(`/callSchedule/past/${subjectId}/${currentDate}?timezone=${timeZone}&${serializeQuery(paginationParameters)}`);
            if(res.data) {
                const callSchedules = res.data.content;
                this.setState(prevState => ({
                    callSchedules: isRefresh ? callSchedules : [...prevState.callSchedules, ...callSchedules],
                }));
            }
            this.setState({
                loading: false,
                loadingMore:false,
            });
        } catch(error){
            showToast(t('FailedRetrieve'), 'danger', 2000);
            this.setState({
                loading: false,
                loadingMore:false,
            });
        }
    }

    refresh = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState({
                page: 0
            });
            this.retrieveCallSchedules(true);  
        }
    }
    
    render() {
        const{ screenProps, isDeviceOnline, subject: { timeZone } }=this.props;
        const { loading, loadingMore } = this.state;
        let { callSchedules } = this.state;
        let emptyMessage = screenProps.t('NoPastCalls');
        if(!isDeviceOnline) {
            callSchedules = [];
            emptyMessage = screenProps.t('NoInternet');
        }
        return (
            <MeetingSchedules 
            screenProps = {screenProps}
            callSchedules={callSchedules}
            fetchMoreCallSchedules={this.fetchMoreCallSchedules}
            loading={loading}
            loadingMore={loadingMore}
            refresh={this.refresh}
            noCallsMessage={emptyMessage}
            timeZone = {timeZone}
            />
        );
    }
}

const mapStateToProps = state => ({
    subject : state.subjectStudyMetaData.subject,
    isDeviceOnline: state.appStatus.isDeviceOnline,
});

export default connect(mapStateToProps)(PastCallsScreen);