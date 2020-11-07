import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from 'react-native';
import { bindActionCreators } from "redux";
// import PTRView from 'react-native-pull-to-refresh';
import Diary from '../components/Diary';
import { getSVfsForAScheduledDate, getOfflineSVfsForToday } from '../selectors/subjectVisitForm';
import { retrieveSvfsByScheduledDate, storeSelectedSvf as storeSelectedSvfAction } from '../actions/subjectVisitForm';
import { backgroundColor } from '../containers/NavigationScreens';
import { selectVisitForm as selectVisitFormAction } from '../actions/visitForm';
import {getOfflineForms,checkForDataSync} from '../utils/offline/dataSync'
import moment from 'moment';
// import { fromHsv } from "react-native-color-picker";
import {setCurrentScreen,storeSyncStatus,updateSyncCompleteStatus} from '../actions/storeAppStatus';
import api from '../utils/api';
import _ from 'lodash';
import { getTodayCallSchedule } from "../utils/meetingScheduleUtils";
class DiaryScreen extends Component {
    
    state={
        scheduleDate: moment().format('YYYY-MM-DD'),
        callSchedules: [],
        loading: false,
    };

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: navigation.state.params ? navigation.state.params.title : t('HomePatnt_Diary'),
    });

    componentDidMount(){
       this.retrieveCallSchedules();
    }

    componentDidUpdate (prevProps, prevState) {
        const { scheduleDate } = this.state;
        const{isDeviceOnline}=this.props;
        if(prevProps.isDeviceOnline==false && isDeviceOnline==true && Platform.OS!='web'){
                 this.setState({
                    scheduleDate: moment().format('YYYY-MM-DD'), 
                });
                // alert("date changed!");
            }
        if (prevState.scheduleDate !== scheduleDate) {
                this.retrieveCallSchedules();
                this.refreshDiary()
       

        }
    }

    refreshDiary = (prevProps) => {
        const { retrieveSvfsByScheduledDate: getSvfsByScheduledate,
            subjectStudyMetaData: {
                subject
            },
            selectedLanguage,
            screenProps: { t },
            isDeviceOnline,
            currentScreen,
        } = this.props;
        const { scheduleDate } = this.state;
        
        if(isDeviceOnline) {
            getSvfsByScheduledate(subject, scheduleDate, selectedLanguage, t);
        } this.props.navigation.setParams({ title: t('HomePatnt_Diary') });
    }

    changeScheduleDate = (date) => {
        this.setState({
            scheduleDate: moment(date).format('YYYY-MM-DD'), 
        })
    }

    addAllDayForSvfs = (svfs) => {
        const { screenProps: { t } } = this.props;
        return svfs.map(svf=> {
            return {
                ...svf,
                time: svf.time || t('tmlnallday'),
            }
        })
    }

    sortSvfsAndCallsByTime = (svfs) => {
        if(svfs.length > 0) return _.sortBy(svfs, ['scTimeSort']);
        return svfs;
    }

    retrieveCallSchedules = async () => {
        const { subject: { id: subjectId, timeZone } } = this.props;
        const { scheduleDate } = this.state

        const selectedDate = scheduleDate;
        try{
            this.setState({
                loading: true,
            })
            const res = await api.get(`/callSchedule/today/${subjectId}/${selectedDate}?timezone=${timeZone}`);
            const callSchedules = res.data;
            this.setState({
                callSchedules: callSchedules || [],
            });
           
            this.setState({
                loading: false,
            });
        } catch(error){
            console.log(error)
            this.setState({
                loading: false,
            });
        }
    }
    
    render() {
        const {syncCompleted,updateSyncCompleteStatus,setCurrentScreen,appStatus, navigation,storeSyncStatus, loading, screenProps, isDeviceOnline, selectVisitForm,OfflineFormsToSync ,storeSelectedSvf,
        subject: { timeZone }} = this.props;
        let { isSyncing,onlineSvfs, offlineSvfs ,getOfflineForms} = this.props;
        const { callSchedules, loading: callLoading } = this.state;
        let svfs = [];

        let loCallSchedules = getTodayCallSchedule(callSchedules, timeZone);
        
        if(isDeviceOnline ) {
            svfs = onlineSvfs;
            loCallSchedules = _.isEmpty(loCallSchedules) ? [] : loCallSchedules;
        } else if(Platform.OS!='web' && !isDeviceOnline){
            svfs = offlineSvfs;
            loCallSchedules = [];
        }
        svfs = this.addAllDayForSvfs(svfs);
        svfs = [...svfs, ...loCallSchedules];
        svfs = this.sortSvfsAndCallsByTime(svfs);
        return (
        <View style={{ flex: 1}}>
            <Diary
                syncCompleted={syncCompleted}
                updateSyncCompleteStatus={updateSyncCompleteStatus}
                setCurrentScreen={setCurrentScreen}
                checkForDataSync={checkForDataSync}
                appStatus={appStatus}
                isSyncing={isSyncing}
                storeSyncStatus={storeSyncStatus}
                getOfflineForms={getOfflineForms}
                OfflineFormsToSync={OfflineFormsToSync}
                screenProps={screenProps}
                navigation={navigation}
                svfs={svfs}
                changeScheduleDate={this.changeScheduleDate}
                refreshDiary={this.refreshDiary}
                loading={loading}
                isDeviceOnline={isDeviceOnline}
                selectVisitForm={selectVisitForm}
                storeSelectedSvf={storeSelectedSvf}
                retrieveCallSchedules={this.retrieveCallSchedules}
                callLoading={callLoading} 
                timeZone = {timeZone}/>
            {/* </PTRView> */}
        </View>
        );
    }
}

const mapStateToProps = state => ({
    subject: state.subjectStudyMetaData.subject,
    selectedLanguage: state.changeLanguage.selectedLanguage,
    onlineSvfs: getSVfsForAScheduledDate(state),
    loading: state.subjectVisitForm.loading,
    subjectStudyMetaData: state.subjectStudyMetaData,
    offlineSvfs: getOfflineSVfsForToday(state),
    isDeviceOnline: state.appStatus.isDeviceOnline,
    OfflineFormsToSync: state.appStatus.OfflineFormsToSync,
    currentScreen: 'FORMS_LIST',
    isSyncing: state.appStatus.isSyncing,
    syncCompleted:state.appStatus.syncCompleted,
    appStatus:state.appStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveSvfsByScheduledDate,
        selectVisitForm: selectVisitFormAction,
        storeSelectedSvf: storeSelectedSvfAction,
        getOfflineForms: getOfflineForms,
        setCurrentScreen,
        storeSyncStatus,
        updateSyncCompleteStatus
        
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);