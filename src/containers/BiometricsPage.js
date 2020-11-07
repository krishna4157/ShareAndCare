import React, { Component } from "react";
import Biometrics from "../components/subjectDashBoard/Biometrics";
import { connect } from "react-redux";

class BiometricsPage extends Component {
    state={};
    
    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: t('Biometrics'),
      });

    render() {
        const {BiometricsData, screenProps}=this.props;
        return (
            <Biometrics BiometricsData={BiometricsData} screenProps = {screenProps}/>
        );
    }
}

const mapStateToProps = state => ({
    BiometricsData: state.healthKitData.subjectHealthData,
});

export default connect(mapStateToProps)(BiometricsPage);