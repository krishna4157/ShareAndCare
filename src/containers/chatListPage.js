import React, { Component } from "react";
import { connect } from "react-redux";
import api from '../utils/api';
import { bindActionCreators } from "redux";
import { serializeQuery } from '../utils/paginationUtils';
import ChatList from "../components/chat/chatList";
import showToast from '../utils/toast';
import _ from 'lodash';
import { addParticipant, removeParticipant, addMessage, removeMessage } from '../components/chat/utils';
import { View, Card, Text } from "native-base";
import properties from '../constants/appConstants';
import { retrieveSubjectDeviceToken } from '../utils/secureStorageUtils';
import { setSelectedChat, addMessageToSelectedChat, reduceUnReadChatsBy1, 
    addMessageToDeleteAction, clearSelectedChatAction, clearUnReadCount } from '../actions/chat';
import moment from 'moment';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';



class ChatListPage extends Component {
    state={
        chats:[],
        chatPage: 0,
        loading: false,
        loadingMore: false,
        selectedChat: {},
        page:0
    };

    subscription = null;
    stompClient = null;

    componentDidMount() {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.connectSocket();
            this.retrieveChats();
        }
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
                this.subscription = stompClient.subscribe(`/ezPro-chat/subscribe/${id}`, 
                            (message) => {
                                this.onMessageReceived(message)}, 
                                { login: header}
                                );
            }
            );
        }
        
    }

    componentWillUnmount = () => {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.stompClient && this.stompClient.connected){
            this.stompClient.disconnect();
        }
        
    }
    onMessageReceived = (msg) => {
        const { subject: { id: subjectId }, setSelectedChat: loSetSelectedChat,
        addMessageToSelectedChat: loAddMessage, navigation,
        addMessageToDeleteAction: loAddMessageToDelete, selectedChat, clearUnReadCount } = this.props;
        const {
        //   selectedChat,
           chats,
        } = this.state;
        const message = JSON.parse(msg.body);
        switch (message.eventType) {
          case 'MESSAGE': {
            const obj = addMessage({
              message: { ...message },
              selectedChatId: selectedChat.id,
              chats: [...chats],
              userId: subjectId,
            });
            this.setState(prevState => ({
                ...prevState,
                chats: obj.chats,
            }));
            if(_.isEqual(_.toUpper(selectedChat.id), _.toUpper(_.get(obj.ezProChatMessage, 'ezProChat.id')))) {
                loAddMessage(obj.ezProChatMessage);
                loSetSelectedChat(_.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(selectedChat.id))));
                navigation.setParams({
                    selectedChat: _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(selectedChat.id))),
                    })
            }
            if(message.chatId === selectedChat.id) {
                clearUnReadCount(true);
            }
            break;
          }
          case 'PARTICIPANT_ADDED':
          {
            const obj = addParticipant({
              message: { ...message },
              chats: [...chats],
              userId: subjectId,
              selectedChatId: selectedChat.id,
            });
            this.setState(prevState => ({
                ...prevState,
                chats: obj.chats,
                selectedChat: obj.selectedChat || {},
            }));
            loSetSelectedChat(obj.selectedChat || {});
            if(message.chatId === selectedChat.id) {
                clearUnReadCount(true);
            }
            navigation.setParams({
                selectedChat: obj.selectedChat || {},
                });
            break;
          }
          case 'PARTICIPANT_REMOVED':
          {
            const obj = removeParticipant({
              message: { ...message }, chats: [...chats], userId: subjectId,
              selectedChatId: selectedChat.id,
            });
            this.setState(prevState => ({
                ...prevState,
                chats: obj.chats,
            }));
            if(_.isEqual(_.toUpper(subjectId), _.toUpper(_.get(obj.participant, 'participantPkId')))){
                loSetSelectedChat({});
                navigation.setParams({
                    selectedChat: {},
                    });
            } if(_.isEqual(_.toUpper(selectedChat.id), _.toUpper(_.get(message, 'chatId')))) {
                loSetSelectedChat(_.find(obj.chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(selectedChat.id))));
                navigation.setParams({
                    selectedChat: _.find(obj.chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(selectedChat.id))),
                    });
            }
            if(message.chatId === selectedChat.id) {
                clearUnReadCount(true);
            }
            break;
          }
          case 'MESSAGE_DELETED': {
            const obj = removeMessage({
              message: { ...message },
              selectedChatId: selectedChat.id,
              chats: [...chats],
              userId: subjectId,
            });
            this.setState(prevState => ({
                ...prevState,
                chats: obj.chats,
            }));
            if(_.isEqual(_.toUpper(selectedChat.id), _.toUpper(_.get(obj.ezProChatMessage, 'ezProChat.id')))) {
                loAddMessageToDelete(message.ezProChatMessage);
            }
            if(message.chatId === selectedChat.id) {
                clearUnReadCount(true);
            }
            break;
          }
          default:
            break;
        }
      }

    componentDidUpdate(prevProps) {
        const { isDeviceOnline, selectedChat: { id }, canClearUnreadCountOfSelectedChat } = this.props;
        if(isDeviceOnline !== prevProps.isDeviceOnline && isDeviceOnline) {
            this.retrieveChats();
        }
        if(id && canClearUnreadCountOfSelectedChat ){
            this.updateLastSeen(id);
        }
    }


    updateUnreadCount = (id) => {
        const { chats } = this.state;
        const { reduceUnReadChatsBy1: loReduceUnReadChatsBy1, unreadChats } = this.props;
        if(unreadChats.count > 0) {
            const loUnreadChatIds = [ ...unreadChats.unreadChatIds ];
            if(_.includes(loUnreadChatIds, id));
            _.remove(loUnreadChatIds, chatId => id === chatId);
            loReduceUnReadChatsBy1({ unreadChatIds: loUnreadChatIds, count: loUnreadChatIds.length});
        }
        const loChats = [...chats];
        const chat = _.find(loChats, ch => _.isEqual(ch.id, id));
        chat.unRead = 0;
        this.setState(prevState => ({
            ...prevState,
            chats,
        }));
      };
    
    updateLastSeen = async (selectedChatId) => {
        const { subject: { id}, updateUnreadCount, clearUnReadCount } = this.props;
        clearUnReadCount(false);
        const ezProChatParticipant = {
          ezProChat: {
            id: selectedChatId,
          },
          participantPkId: id,
          lastSeenDate: moment().utc(),
        };
        
        try {
          await api.put('/ezProChatParticipant/lastSeen/update', ezProChatParticipant);
          this.updateUnreadCount(selectedChatId);
        } catch (error) {
          console.log(error);
        }
      }
    
    

    setSelectedChatAndNavigate = (id) => {
        const { chats } = this.state;
        const { navigation, setSelectedChat: loSetSelectedChat } = this.props;
        const selectedChat = _.find(chats, ch => _.isEqual(_.toUpper(id), _.toUpper(ch.id)));
        this.setState(prevState => ({
            ...prevState,
            selectedChat,
        }), () => {
            navigation.navigate('Conversation', {
                selectedChat,
                // updateLastSeen: (selectedChatId) => this.updateLastSeen(selectedChatId),
            })
        });
        loSetSelectedChat(selectedChat);
    }

    fetchMoreChats = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState(
            prevState => ({
                chatPage: prevState.chatPage + 1,
                page: prevState.page+1,
                loadingMore: true,
            }),
            () => {
                    this.retrieveChats();
            },
            );
        }
    };
    
    retrieveChats = async (isRefresh) => {
        const { subject: { id: subjectId }, screenProps: { t } } = this.props;
        const { page, loadingMore } = this.state;
        const paginationParameters = {
            size: 15,
            page: isRefresh ? 0 : page,
        };

        try{
            if(!loadingMore) {
                this.setState({
                    loading: true,
                })
            }
            const res = await api.get(`/ezProChat/${subjectId}?${serializeQuery(paginationParameters)}`);
            if(res.data) {
                const chats = res.data.content;
                this.setState(prevState => ({
                  chats: isRefresh ? chats : [...prevState.chats, ...chats],
                }));
            }
            this.setState({
                loading: false,
                loadingMore:false,
            });
        } catch(error){
            console.log(error)
            showToast(t('FailedRetrieve'), 'danger', 2000);
            this.setState({
                loading: false,
                loadingMore:false,
            });
        }
    }

    refresh = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState({
                page: 0
            });
            this.retrieveChats(true);  
        }
    }
    
    render() {
        const{ screenProps,navigation, isDeviceOnline, clearSelectedChat, 
            subject: { timeZone, id } }=this.props;
        const { loading, loadingMore } = this.state;
        let { chats } = this. state;
        let emptyMessage = screenProps.t('NoChats');
        if(!isDeviceOnline) {
            chats = [];
            emptyMessage = screenProps.t('NoInternet');
        }
       
        return (
            <ChatList 
            navigation={navigation}
            screenProps = {screenProps}
            chats={chats}
            fetchMoreChats={this.fetchMoreChats}
            loading={loading}
            loadingMore={loadingMore}
            refresh={this.refresh}
            noChatsMessage={emptyMessage}
            timeZone = {timeZone}
            setSelectedChatAndNavigate = {this.setSelectedChatAndNavigate}
            clearSelectedChat={clearSelectedChat}
            />
        );
    }
}

const mapStateToProps = state => ({
    subject : state.subjectStudyMetaData.subject,
    isDeviceOnline: state.appStatus.isDeviceOnline,
    unreadChats: state.chat.unreadChats,
    selectedChat: state.chat.selectedChat,
    canClearUnreadCountOfSelectedChat: state.chat.canClearUnreadCountOfSelectedChat,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setSelectedChat,
        addMessageToSelectedChat,
        reduceUnReadChatsBy1,
        addMessageToDeleteAction,
        clearSelectedChat: clearSelectedChatAction,
        clearUnReadCount,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChatListPage);