import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Contact from '../components/Contact';
import {localeStore} from '../utils/localization/localizationUtils';
import {setCurrentScreen} from '../actions/storeAppStatus';
import { getContactDetails } from '../actions/subjectStudyMetaData';

class ContactScreen extends Component {
    state={};

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: navigation.state.params ? navigation.state.params.title : t('Actn_sheetContact'),
      });

      componentDidMount(){
          const{setCurrentScreen}=this.props;
        setCurrentScreen("");
      }

    componentDidUpdate (prevProps) {

        
        const {selectedLanguage, screenProps: { t } } = this.props;
        setCurrentScreen("");
        if ( selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: t('Actn_sheetContact') });
        }
    }
    
    render() {
        const { navigation, client, screenProps, getContactDetails, isDeviceOnline } = this.props;
        return (
            <Contact navigation={navigation} client={client} 
            screenProps={screenProps} getContactDetails = {getContactDetails}
            isDeviceOnline = {isDeviceOnline}
            />
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      client: state.subjectStudyMetaData.studySite.client,
      isDeviceOnline: state.appStatus.isDeviceOnline,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setCurrentScreen,
        getContactDetails,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);