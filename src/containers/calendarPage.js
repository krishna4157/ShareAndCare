import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveAllSvfsForASubject } from '../actions/subjectVisitForm';
import { getSubjectSvfs } from '../selectors/subjectVisitForm';
import {localeStore} from '../utils/localization/localizationUtils';
import EventCalender from '../components/EventCalendar';
import {setCurrentScreen} from '../actions/storeAppStatus';


class EventCalenderScreen extends Component {
    state={};

    componentDidMount() {
        const {setCurrentScreen} = this.props;

        setCurrentScreen("");

        // BackHandler.addEventListener('hardwareBackPress',() => true )
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : localeStore.EventCalendar,
    });

    componentDidUpdate (prevProps) {
        const { selectedLanguage } = this.props;
        if (selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: localeStore.EventCalendar })
        }
    }

    render() {
        const { 
            navigation,
            selectedLanguage,
            retrieveSvfsForASubject: fetchSvfsForSubject,
            svfs,
            loading,
            subject,
        } = this.props;
        return (
            <EventCalender
            navigation={navigation}
            retrieveSvfsForASubject={fetchSvfsForSubject}
            selectedLanguage={selectedLanguage}
            svfs={svfs}   
            loading={loading} 
            subject={subject}
            />
            // <View/>
        );
    }
}

const mapStateToProps = state => ({
    selectedLanguage: state.changeLanguage.selectedLanguage,
    svfs: getSubjectSvfs(state),
    subject: state.subjectStudyMetaData.subject,
    loading: state.subjectVisitForm.loading
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    retrieveSvfsForASubject: retrieveAllSvfsForASubject,
    setCurrentScreen,

  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(EventCalenderScreen);