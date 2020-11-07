import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserValidation from '../components/forgotPassword/UserValidation';

class ForgotPasswordScreen extends Component {
    state={
        deviceToken: '',
    };

    render() {
        const { navigation, screenProps, deviceLocation } = this.props;
        return (
            <UserValidation
            navigation={navigation}
            screenProps={screenProps}
            deviceLocation={deviceLocation}
            />
        );
    }
}

const mapStateToProps = state => ({
      deviceLocation: state.deviceLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);