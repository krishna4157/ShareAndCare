import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { retrieveHealthkitData } from '../actions/healthkit';
import Health from "../components/subjectDashBoard/Health";

class HealthPage extends Component {
    
    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: t('HealthMenu'),
      });

    render() {
        const {navigation, retrieveHealthkitData, subject, screenProps }=this.props;
        return (
            <Health navigation={navigation} retrieveHealthkitData={retrieveHealthkitData} 
            subject={subject} screenProps={screenProps}/>
        );
    }
}

const mapStateToProps = state => ({
    subject : state.subjectStudyMetaData.subject,
  });
  
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    retrieveHealthkitData,
    },
    dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(HealthPage);