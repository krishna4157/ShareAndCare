import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Form from '../components/Form';
import {retrieveFields, emptyFieldsInStore} from '../actions/field';
import {updateCrfData} from '../actions/crfData';
import {storeOfflineFormsToSync} from '../actions/storeAppStatus'
import {getFields, buildOfflineFieldsWithOnlineData, buildOfflineFields} from '../selectors/field';
import {backgroundColor} from '../containers/NavigationScreens';
import {setCurrentScreen,storeSyncStatus, updateSyncCompleteStatus} from '../actions/storeAppStatus';

class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyLoadedOfflineData: false,
      offlineSaveLoading: false,
      alreadyLoadedOnlineData: false,
    };
    this.fields = [];
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam ('formName'),
  });

  componentDidMount () {
    const {navigation, retrieveFields, appStatus, selectedLanguage, screenProps: { t},selectedSvf, isDeviceOnline, setCurrentScreen } = this.props;
    const {svfId,formId} = selectedSvf;
    setCurrentScreen("FORM");
    const isDeviceOnlineAtDiary = navigation.getParam ('isDeviceOnlineAtDiary');
    if(isDeviceOnline && isDeviceOnlineAtDiary) {
      retrieveFields (formId, svfId, selectedLanguage, t);
      this.setState({
        alreadyLoadedOnlineData: true,
      });
    } else {
      this.setState({
        alreadyLoadedOfflineData: true,
      });
    }
  }

  componentDidUpdate (prevProps) {
    const { isDeviceOnline } = this.props;
    if(isDeviceOnline !== prevProps.isDeviceOnline && !isDeviceOnline) {
      this.setState({
        alreadyLoadedOfflineData: true,
      });
    }
    else if(isDeviceOnline !== prevProps.isDeviceOnline && isDeviceOnline) {
      this.setState({
        alreadyLoadedOnlineData: true,
      });
    }
  }

  updateOfflineSaveLoading = (offlineSaveLoading) => {
    this.setState({ offlineSaveLoading });
  }

  componentWillUnmount = () => {
    const { emptyFieldsInStore } = this.props;
    this.setState({
      alreadyLoadedOfflineData: false,
      alreadyLoadedOnlineData: false,
    });
    this.fields = [];
    emptyFieldsInStore();
  }

  render () {
    const {
      navigation,
      updateCrfData: updtCrfData,
      loading,
      storeOfflineFormsToSync,
      subject,
      subjectTimezone,
      screenProps,
      isDeviceOnline,
      offlineFieldsWithData,
      offlineFieldsWithOutData,
      OfflineFormsToSync,
      selectedSvf,
      subjectVisitId,
      subjectId,
      rsaPublicKey,
      storeSyncStatus,
      updateSyncCompleteStatus,
      connectionFailed,
    } = this.props;
    const { offlineSaveLoading, alreadyLoadedOnlineData } = this.state;
    const loadOfflineData = connectionFailed === true ? connectionFailed : !alreadyLoadedOnlineData;
    const loadOnlineData = connectionFailed === true ? !connectionFailed : alreadyLoadedOnlineData;

    const isDeviceOnlineAtDiary = navigation.getParam ('isDeviceOnlineAtDiary');
    if(isDeviceOnline && isDeviceOnlineAtDiary && loadOnlineData) {
      this.fields = offlineFieldsWithData;
    } else if(!isDeviceOnline && loadOfflineData){
      this.fields = offlineFieldsWithOutData;
    }

    return (
      <View style={{ flex: 1}}>
        {(loading || offlineSaveLoading) && <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', zIndex: 2}}>
          <ActivityIndicator
                  size="large"
                  color={backgroundColor}
                  animating={true}
                  key={loading ? "loading" : "not-loading"}
                />
                
          </View>}
        <Form
        storeSyncStatus={storeSyncStatus}
          subjectId={subjectId}
          rsaPublicKey={rsaPublicKey}
          subjectVisitId={subjectVisitId}
          storeOfflineFormsToSync={storeOfflineFormsToSync}
          OfflineFormsToSync={OfflineFormsToSync}
          isDeviceOnline={isDeviceOnline}
          subjectTimezone={subjectTimezone}
          navigation={navigation}
          fieldList={this.fields}
          updateCrfData={updtCrfData}
          subject={subject}
          loading={loading}
          screenProps={screenProps}
          selectedSvf={selectedSvf}
          updateSyncCompleteStatus={updateSyncCompleteStatus}
          updateOfflineSaveLoading={this.updateOfflineSaveLoading}
          offlineSaveLoading={offlineSaveLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rsaPublicKey: state.subjectStudyMetaData.subject.publicKey, 
  subject: state.subjectStudyMetaData.subject,
  subjectId: state.subjectStudyMetaData.subject.id,
  selectedLanguage: state.changeLanguage.selectedLanguage,
  fields: getFields (state),
  loading: state.field.loading,
  crfDataLoading: state.crfData.loading,
  subjectTimezone: state.subjectStudyMetaData.subject.timeZone,
  offlineFieldsWithData: buildOfflineFieldsWithOnlineData(state),
  offlineFieldsWithOutData: buildOfflineFields(state),
  OfflineFormsToSync: state.appStatus.OfflineFormsToSync,
  isSyncing: state.appStatus.isSyncing,
  isDeviceOnline: state.appStatus.isDeviceOnline,
  currentScreen: 'FORM',
  selectedSvf: state.subjectVisitForm.selectedSvf,
  subjectVisitId : state.subjectStudyMetaData.subjectVisit.id,
  appStatus: state.appStatus,
  connectionFailed: state.field.connectionFailed,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators (
    {
      retrieveFields,
      updateCrfData,
      storeOfflineFormsToSync,
      setCurrentScreen,
      storeSyncStatus,
      updateSyncCompleteStatus,
      emptyFieldsInStore
    },
    dispatch
  );

export default connect (mapStateToProps, mapDispatchToProps) (FormScreen);
