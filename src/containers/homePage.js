import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from '../components/Home';
import { BackHandler, Alert, Platform } from 'react-native';
// import { getDeviceToken } from '../utils/pushNotification/configurePushNotification';
import { retrieveSubjectCompliance } from '../utils/homeUtils';
import { withNavigationFocus } from "react-navigation";
import {setCurrentScreen} from '../actions/storeAppStatus';
import { saveHealthkitData } from '../actions/healthkit'
import moment from "moment";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { retrieveSubjectDeviceToken } from '../utils/secureStorageUtils';
import properties from '../constants/appConstants';
import { setUnreadChats, retrieveUnreadChats as retrieveUnreadChatsAction } from '../actions/chat';

class HomeScreen extends Component {
    state={
        subjectCompliance: {
            dayCompliance: 0,
          weekCompliance: 0,
          monthCompliance: 0,
          totalCompliance: 0,
        }
        
    };
    subscription = null;
    stompClient = null;

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: navigation.state.params ? navigation.state.params.title : t('HomeTitle'),
      });


      componentDidMount() {
        const{setCurrentScreen, subject, saveHealthkitData: syncHealthData, retrieveUnreadChats }= this.props;
        setCurrentScreen("");
        const date = moment().format("YYYY-MM-DD").toString()
        if(Platform.OS === 'ios') {
            syncHealthData(subject.id, date);
            setInterval(() => {
                syncHealthData(subject.id, date);
            }, 60000);
        }
        this.connectSocket();
        retrieveUnreadChats(subject.id);
      }    

      componentDidUpdate (prevProps) {
        const { selectedLanguage, isFocused, screenProps: { t } } = this.props;
        if ( selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: t('HomeTitle') });
        } if ( isFocused === true) {
            // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        } if ( isFocused === false) {
            // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }

    }

    handleBackPress = () => {// works best when the goBack is async
        this.exitApplication();
        return true;
        // BackHandler.exitApp();
        // return true;
    }
    
    retrieveSubjectCompliance = async() => {
        const { subject } = this.props;
        try {
            const subjectCompliance = await retrieveSubjectCompliance(subject);
            this.setState({
                subjectCompliance,
            })
        } catch (error) {
           console.log(error);
        }
        
    }
    
    exitApplication = () => {
        Alert.alert(
            '',
            'Exit ezpro?',
            [
              {
                text: 'Cancel',
                onPress: () => true,
                style: 'cancel',
              },
              {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
    }

    connectSocket = async() => {
        const { subject: { id }} = this.props;
        const data = await retrieveSubjectDeviceToken();
        var stompClient = null;
        var socket = new SockJS(properties.socketUrl);
        stompClient = Stomp.over(socket);
        const header = JSON.stringify({
            'Device-Token-Id': data.subjectDeviceTokenId,
            'Device-Token': data.subjectDeviceToken,
        });
        if(stompClient){
            stompClient.connect(header, null, () => {
                this.subscription = stompClient.subscribe(`/ezPro-chat/unread/count/subscribe/${id}`, 
                            (message) => {
                                this.onMessageReceived(message.body)}, 
                                { login: header}
                                );
            }
            );
        }
        
    }

    onMessageReceived = (chatIds) => {
        const { setUnreadChats: loSetUnreadChats, selectedChat } = this.props;
        // console.log('chatIds:----', chatIds)
        let loChatIds = JSON.parse(chatIds);
        _.remove(loChatIds, chatId => selectedChat.id === chatId);
        const count = loChatIds.length;
        loSetUnreadChats({unreadChatIds: loChatIds, count});
    }


    componentWillUnmount = () => {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.stompClient && this.stompClient.connected){
            this.stompClient.disconnect();
        }
    }
    
      componentDidUpdate (prevProps) {
        const { selectedLanguage, isFocused, screenProps: { t } } = this.props;
        if ( selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: t('HomeTitle') });
        } if ( isFocused === true) {
            // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        } if ( isFocused === false) {
            // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }

    }

    handleBackPress = () => {// works best when the goBack is async
        this.exitApplication();
        return true;
        // BackHandler.exitApp();
        // return true;
    }
    
    render() {
        const { subjectCompliance } = this.state;
        const { navigation, loading, screenProps } = this.props;
        return (
            <Home
            navigation={navigation}
            loading={loading}
            subjectCompliance={subjectCompliance}
            retrieveSubjectCompliance={this.retrieveSubjectCompliance}  
            screenProps={screenProps}  
            />
        );
    }
}

const mapStateToProps = state => ({
      selectedLanguage: state.changeLanguage.selectedLanguage,
      loading: state.loading,
      subject: state.subjectStudyMetaData.subject,
      selectedChat: state.chat.selectedChat,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
    setCurrentScreen,
    saveHealthkitData,
    setUnreadChats,
    retrieveUnreadChats: retrieveUnreadChatsAction
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(HomeScreen));