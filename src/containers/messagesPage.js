import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Messages from '../components/Messages';
// import PTRView from 'react-native-pull-to-refresh';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';
import { retrieveMessagesRequest,
    retrieveMessagesFailure,
    retrieveMessagesSuccess,
} from '../actions/message';
import { retrievePushNotifications, updateReadStatus } from '../utils/pushNotificationUtils';
import { backgroundColor } from './NavigationScreens';
import {setCurrentScreen} from '../actions/storeAppStatus';

class MessagesScreen extends Component {
    state={
        pushNotifications: [],
        loading: false,
    };

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: navigation.state.params ? navigation.state.params.title : t('Homemsgs'),
      });

    componentDidMount () {
        const {setCurrentScreen}=this.props;
        setCurrentScreen("")
        this.fetchPushNotifications();
    }

    updatePushNotifications = (pushNotifications) => {
        this.setState({
            pushNotifications,
        })
    }

    componentDidUpdate (prevProps) {
        const { selectedLanguage, screenProps: { t } } = this.props;
        if ( selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: t('Homemsgs') });
        }
    }

    fetchPushNotifications = async () => {
        const { subjectId, rmr, rmf, rms, screenProps: { t } } = this.props;
        try {
            this.changeLoading();
           const res = await retrievePushNotifications(subjectId, { rmr, rmf, rms }, t);
           const messages = res ? res.filter(message => message.sentTime !== null) : [];
           setTimeout(() => this.changeLoading(), 2000);
           this.updatePushNotifications(messages);
           updateReadStatus(subjectId);
        } catch(error) {
            this.changeLoading();
            console.log(error.message, 'failed');
        }
    }

    changeLoading = () => {
        this.setState(prevState => ({
            ...prevState,
            loading: !prevState.loading,
        }))
    }
    
    render() {
        const { selectedLanguage, navigation, screenProps } = this.props;
        const { pushNotifications, loading } = this.state;
        return (
            // <PTRView onRefresh={this.fetchPushNotifications} delay={0}>
            <View style={{flex:1}}>
            <Messages
            navigation={navigation}
            selectedLanguage={selectedLanguage}
            pushNotifications={pushNotifications}
            screenProps={screenProps}
            loading={loading}
            />
            </View>
            // </PTRView>
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      subjectId: state.subjectStudyMetaData.subject.id,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        rmr: retrieveMessagesRequest ,
        rmf: retrieveMessagesFailure,
        rms: retrieveMessagesSuccess,
        setCurrentScreen,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);