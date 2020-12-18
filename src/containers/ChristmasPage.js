import React, { Component } from "react";
import { connect } from "react-redux";
import ChristmasScreen from "../components/ChristmasScreen";
class ChristmasPage extends Component {
    state={
        deviceToken: '',
    };


    render() {
        const  { navigation} = this.props;
        return (
            <ChristmasScreen navigation={navigation}
            />
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      loading: state.loading,
      currentScreen: state.appStatus.currentScreen,
      deviceLocation: state.deviceLocation,
});


export default connect(mapStateToProps)(ChristmasPage);
