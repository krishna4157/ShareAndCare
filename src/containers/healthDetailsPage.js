import React, { Component } from "react";
import ActivityDetails from "../components/subjectDashBoard/ActivityDetails";
import { connect } from "react-redux";

class HealthDetailsPage extends Component {
    state={};
    
    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: t('Activity'),
      });

    render() {
        const {ActivityData,GoalData,lastSync, screenProps}=this.props;
        return (
            <ActivityDetails screenProps = {screenProps} lastSync={lastSync} ActivityData={ActivityData} GoalData={GoalData}/>
        );
    }
}


const mapStateToProps = state => ({
    ActivityData: state.healthKitData.subjectActivity,
    GoalData: state.healthKitData.subjectActivityGoal,
    lastSync: state.healthKitData.lastSync,

});

export default connect(mapStateToProps)(HealthDetailsPage);