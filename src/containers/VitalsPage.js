import React, { Component } from "react";
import Vitals from "../components/subjectDashBoard/Vitals";
import {  bindActionCreators } from "redux";
import { connect } from "react-redux";

class VitalsPage extends Component {
    state={};
    
    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: t('Vitals'),
      });
      
    render() {
        const{subjectHealthData, screenProps}=this.props;
        return (
            <Vitals subjectHealthData={subjectHealthData}  screenProps = {screenProps}/>
        );
    }
}

const mapStateToProps = state => ({
    subjectHealthData: state.healthKitData.subjectHealthData,
});

export default connect(mapStateToProps)(VitalsPage);