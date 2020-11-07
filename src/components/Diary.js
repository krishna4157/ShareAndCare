import React, { Component } from 'react';
import { Text } from "native-base";
import { View, ActivityIndicator, Dimensions,Image, Platform} from 'react-native';
import DatePicker from 'react-native-datepicker';
// import PTRView from 'react-native-pull-to-refresh';
import { dateFieldStyle } from '../components/fields/styles';
import { TimeLineComponent } from '../utils/timelineUtils';
import { NavigationEvents } from 'react-navigation';
import styles from '../components/styles/TimelineStyles';
import { backgroundColor } from '../containers/NavigationScreens';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { BlurView } from 'expo-blur';
import Sync, { SyncFinished } from './Sync';
import FormsToSync from './FormsToSync';
import SyncImage from '../../assets/SyncImage.png';
import WebDatePicker from './webDatePicker/WebDatePicker';

class Diary extends Component {

  state = {

    selectedDate: new Date(Date.now()),
    syncing:false,
    NoOfFormsToSync:0,
    isSyncCompleted: '',
    showSyncingCompleted: false
  };

  stopSyncing=()=>{
    const{storeSyncStatus}=this.props;
    this.setState({syncing:false});
    storeSyncStatus(true);

  }


  componentDidUpdate(prevProps){
    
    const {OfflineFormsToSync,refreshDiary,storeSyncStatus,syncCompleted,isDeviceOnline}=this.props;
    if(prevProps.isDeviceOnline==false && isDeviceOnline==true && Platform.OS!='web'){
      // console.log("CURRENT DATE : "+JSON.stringify(new Date(Date.now())));
      this.setState({
        selectedDate: new Date(Date.now()), 
      });
      //  alert("date changed!");
    }
    if(syncCompleted==true && syncCompleted !=prevProps.syncCompleted){
        refreshDiary();
    }

   if(prevProps.syncCompleted !== syncCompleted && syncCompleted === true) {
            this.displaySyncCompleted(); 
    }




  }

  displaySyncCompleted = () => {
    this.setState({
        showSyncingCompleted: true,
    })
    setTimeout(() => {
      // alert('Hey close popup')
      this.closeSyncCompleted();
    }, 2500);
  }

  closeSyncCompleted = () => {
    this.setState({
      showSyncingCompleted: false,
  })
  }

  async componentDidMount() {

    const {storeSyncStatus,OfflineFormsToSync,isSyncing,refreshDiary}= this.props;
      console.log(isSyncing);
      if(OfflineFormsToSync>0){ 
    storeSyncStatus(true);
   
 
      } else {
        storeSyncStatus(false);
      }
  
      refreshDiary();
    
 
  }

  onChangeLanguage = () => {
    const { screenProps: { t,isConnected } } = this.props;
    this.props.navigation.setParams({ title: t('HomePatnt_Diary') })
  }

  changeDate = (selectedDate) => {
    const { changeScheduleDate } = this.props;
    changeScheduleDate(selectedDate);
    this.setState({ selectedDate });
    
  }


  renderTimeline = () => {
    const {syncCompleted,isSyncing, svfs, navigation, screenProps, isDeviceOnline, 
      selectVisitForm, storeSelectedSvf, timeZone } = this.props;
    let { loading } = this.props;
    loading = !isDeviceOnline ? isDeviceOnline : loading;
    const { t } = screenProps;
    if (!loading && svfs.length === 0) {
      return <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{isDeviceOnline == true ? t('NoFormToFill'):t('NoForm')}</Text>
      </View>
    } else if(!loading && svfs.length > 0) {
      return <TimeLineComponent screenProps={screenProps} navigation={navigation} svfs={svfs} 
      selectVisitForm={selectVisitForm}
      storeSelectedSvf={storeSelectedSvf}
      isDeviceOnline={isDeviceOnline}
      timeZone = {timeZone}
      />
    }
    return <View/>
  }

  renderDatePicker = () => {
    const { selectedDate } = this.state;
    const { screenProps: { t } } = this.props;
    if(Platform.OS === 'web') {
      return(
        <WebDatePicker
          onDateChange={date => this.changeDate(date)}
        />
      )
    } else {
      return(
        <DatePicker
             style={{ minWidth: 300, alignSelf: "center" }}
             date={selectedDate}
             mode="date"
             placeholder={t("SelectDate")}
             format="DD-MMM-YYYY"
             confirmBtnText="Confirm"
             cancelBtnText="Cancel"
             customStyles={dateFieldStyle}
             onDateChange={date => this.changeDate(date)}
           /> 
      ) 
    }
  }


  render() {
    
    const { 
        syncCompleted,
        setCurrentScreen,
      isSyncing,
      navigation, refreshDiary, screenProps: { t },screenProps, isDeviceOnline,OfflineFormsToSync, retrieveCallSchedules } = this.props;
      let { loading, callLoading } = this.props;
    loading = !isDeviceOnline ? isDeviceOnline : loading;
    const { selectedDate,syncing,NoOfFormsToSync, showSyncingCompleted } = this.state;
    var {height, width} = Dimensions.get('window');
   

    return (
      
      <View style={{flex:1}}>
        
        <NavigationEvents
          
          onDidFocus={() => {
            // console.log('will focus')
            const isFormSubmitted = navigation.getParam("isFormSubmitted");
            setCurrentScreen("")
             if (isFormSubmitted && !isSyncing) {
              refreshDiary();
             }
          }}
        />
        
        <View style={styles.container}>
        <Image 
                source={SyncImage}  
                style={{width: 0, height: 0 }}
            />
          {isDeviceOnline==true  && isSyncing==false ?
            this.renderDatePicker()
          : <FormsToSync t={t} SyncCompleted={syncCompleted} OfflineFormsToSync={OfflineFormsToSync}  stopSyncing={this.stopSyncing} loading={loading} NoOfFormsToSync={NoOfFormsToSync} isConnected={isDeviceOnline} syncing={isSyncing} />
        }
         
        {/* <PTRView onRefresh={() => {
          refreshDiary();
          retrieveCallSchedules();
        }} delay={0} showsVerticalScrollIndicator={false}> */}
            {(loading || callLoading) && (
              <View
                style={{
                  height: height - height * (1 / 4),
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator
                  size="large"
                  color={backgroundColor}
                  animating={true}
                  key={loading ? "loading" : "not-loading"}
                />
              </View>
            )}
            {this.renderTimeline()}
          {/* </PTRView> */}
          {isDeviceOnline==true && isSyncing==true &&
        <View>
         {/* <BlurView tint="light" intensity={60} style={{position:'absolute', justifyContent:'center',height:'100%',width:'105%'}}> */}
            <Sync SyncCompleted={syncCompleted} 
                OfflineFormsToSync={OfflineFormsToSync}  
                stopSyncing={this.stopSyncing} 
                loading={loading} 
                NoOfFormsToSync={NoOfFormsToSync} 
                isConnected={isDeviceOnline} 
                syncing={isSyncing}
                showSyncingCompleted={showSyncingCompleted} screenProps = {screenProps}/>
                
          </View>
          }
          {<SyncFinished showSyncingCompleted={showSyncingCompleted} screenProps = {screenProps}/>}
        
        </View>
      </View>
    );
  }
}

export default Diary;