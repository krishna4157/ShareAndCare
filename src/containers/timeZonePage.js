import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import TimeZone from "../components/selectTimeZone/TimeZone";
import {  bindActionCreators } from "redux";
import { connect } from "react-redux";
import selectTimeZone, { timeZoneSelected } from "../actions/timeZone";
import api from "../utils/api";
import showToast from '../utils/toast';
import {updateTimeZone}  from '../actions/timeZone';
import {storeOfflineFormsToSync} from '../actions/storeAppStatus';
// import AsyncStorage from '@react-native-community/async-storage';
import {setCurrentScreen} from '../actions/storeAppStatus';



class SubjectTimeZone extends Component {

  static navigationOptions=({ navigation, screenProps: { t } }) => ({
    title: t('SelectTimezone'),
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedTimeZone: "",
      timeZones: []
    };
  }

  componentDidMount = () => {
    const {setCurrentScreen}= this.props;
    const { selectedTimeZone} =this.state;
    setCurrentScreen("")
    const {subjectStudyMetaData: { subject:{ timeZone }}}=this.props;
    // this.changeTimeZone(selectedTimeZone);
    this.retrieveTimeZoneList();
  };

  submitTimeZone = async selectedTimeZone => {
    const { storeOfflineFormsToSync: storeNoOfForms,subjectStudyMetaData, updateTimeZone:updateTz, navigation, screenProps: { t } } = this.props;
    const {selectTimeZone} = this.state;
    const subject = {
      id: subjectStudyMetaData.subject.id,
      // ...subjectStudyMetaData.subject,
      timeZone: selectedTimeZone
    };
    
    const ssmd = {
      ...subjectStudyMetaData,
      subject: {
        ...subjectStudyMetaData.subject,
        timeZone: selectedTimeZone
      },
    }
    // let response = await AsyncStorage.getItem("encryptedForms");
    let response = null;
  if(response == null){
  //  response = await AsyncStorage.setItem("encryptedForms","");
   storeNoOfForms(0);
  } else {
    console.log(JSON.parse(response).length);
    storeNoOfForms(JSON.parse(response).length);
  }
    updateTz(subject, ssmd, navigation, t);
    // try {
    //   await api.put(`/subject/timeZone/`, subject);
    //   showToast("Saved successfully", "success", 3000);
    // } catch (error) {
    //   console.log(error);
    //   showToast("Failed to save", "danger", 2000);
    // }
  };

  getTimeZoneList = res => {
    this.setState({
      timeZones: res.data
    });
  };

  changeTimeZone = timeZone => {
    this.setState({
      selectedTimeZone: timeZone
    });
  };

  retrieveTimeZoneList = async () => {
    try {
      const res = await api.get(`/timeZone/`);
      this.getTimeZoneList(res);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { selectedTimeZone, timeZones } = this.state;
    const { data, navigation, screenProps,subjectTimeZone,storeOfflineFormsToSync ,updateTimeZone} = this.props;
    const fromLogin = navigation.getParam('fromLogin');
    const  { loading} = this.props;
    return (
      <View style={{ flex:1,marginTop: fromLogin ? 20 : 0}}>
        <TimeZone
          fromLogin={fromLogin}
          loading={loading}
          navigation={navigation}
          data={data}
          storeOfflineFormsToSync={storeOfflineFormsToSync}
          timeZones={timeZones}
          selectedTimeZone={subjectTimeZone}
          changeTimeZone={this.changeTimeZone}
          submitTimeZone={this.submitTimeZone}
          screenProps={screenProps}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  subjectTimeZone: state.subjectStudyMetaData.subject.timeZone,
  loading: state.loading,
  data: state.timeZone.list,
  subjectStudyMetaData: state.subjectStudyMetaData
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateTimeZone,
    storeOfflineFormsToSync,
    setCurrentScreen 


  },
  dispatch,
);


export default connect(
  mapStateToProps,mapDispatchToProps
)(SubjectTimeZone);
