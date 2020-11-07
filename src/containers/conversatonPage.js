import React, { Component } from "react";
import {  bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import api from '../utils/api';
import { serializeQuery } from '../utils/paginationUtils';
import MeetingSchedules from "../components/MeetingSchedules";
import showToast from '../utils/toast';
import { getDateBySubjectTimezone } from "../utils/dateFormatUtils";
import Conversation from "../components/Conversation";
import { messages as chatMessages } from '../constants/chatMessagesMockData';
import { buildChatMessages, sortInReverseOrder } from '../utils/chatUtils';
import ChatHeader from '../components/ChatHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import HeaderDialogPage from "./HeaderDialogPage";
import AddChatScreenPage from "./AddChatScreenPage";
import AddSelectedPage from "./AddSelectedPage";
import { NavigationEvents } from 'react-navigation';

import { deleteMessage, removeMessagesToDelete, clearUnReadCount } from '../actions/chat';

class ConversationScreen extends Component {
    state={
        callSchedules:[],
        page: 0,
        loading: false,
        loadingMore: false,
        chatMessages: [],
        isRetrievedChatPageEmpty: false,
        isModalVisible: false,
        listOfParticipants: [],
        fileList: [],
        isAddModalVisible: false,
        retrievedParticipants: '',
        selectedChatId: '',
    };

    static navigationOptions = ({ navigation, navigationOptions }) => {
        // headerTitle instead of title
        const selectedChat = navigation.getParam('selectedChat');
        var selectedParticipantsName = [];
        var ezProChatParticipants = _.filter(selectedChat.ezProChatParticipants, p => p.isActive);
        ezProChatParticipants.map((val)=> {
            selectedParticipantsName.push(val.participant.fullName);   
        })
        const participantsNames = selectedParticipantsName || [];
        const openGroupInfo = navigation.getParam('openGroupInfo');
        const goBack = navigation.getParam('goBack');
        const addNewParticipants = navigation.getParam('addNewParticipants');

        return {
            headerTitle: () => <ChatHeader
            navigation={navigation}
            participantsNames={participantsNames}
            openGroupInfo={openGroupInfo}
            goBack={goBack}
            selectedChat= {selectedChat}
            addNewParticipants={addNewParticipants}
            />,
            // headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}>
            //     <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            // </TouchableOpacity>
        }
    };

    getParticipantsList=()=>{
        const  {selectedChat}=this.props;
        var selectedParticipants = [];
        var ezProChatParticipants = _.filter(selectedChat.ezProChatParticipants, p => p.isActive);
        ezProChatParticipants.map((val)=> {
            selectedParticipants.push(val.participant);   
        });
        return selectedParticipants;
    }
    
    componentDidMount() {
        const { navigation, selectedChat } = this.props;
        this.retrieve();
        this.setState({
            selectedChatId: selectedChat.id
        })
    }

    retrieve = () => {
    const { navigation, selectedChat, clearUnReadCount } = this.props;
        const participantsNames = this.getParticipantsNames();
        navigation.setParams({participantsNames: participantsNames,
            openGroupInfo: this.openGroupInfo,
            goBack: this.goBack,
            addNewParticipants: this.addNewParticipants,
            selectedChat,
            })
        this.retrieveChatsByChatId();
        if(!_.isEmpty(selectedChat)){
            // const updateLastSeen = navigation.getParam("updateLastSeen");
            // updateLastSeen(selectedChat.id);
            clearUnReadCount(true);
            
        }
    
        this.setData();  
    }

    componentDidUpdate(prevProps) {
        const { recentUnReadMessages, navigation, messagesToDelete,selectedChat, clearUnReadCount } = this.props;
    //    const selectedChats = navigation.getParam("selectedChat");
        // const updateLastSeen = navigation.getParam("updateLastSeen");
       if(prevProps.selectedChat.id!==selectedChat.id && !_.isEmpty(selectedChat)){
        this.retrieve();
            // this.retrieveChatsByChatId();
       }

        if(!_.isEmpty(recentUnReadMessages)){
            this.addAndRemoveMessages(recentUnReadMessages);
        }
        if(prevProps.selectedChat.id !== selectedChat.id && !_.isEmpty(selectedChat)){
            // this.retrieve();
            // this.retrieveChatsByChatId();
            // updateLastSeen(prevProps.selectedChat.id);
            clearUnReadCount(true);
        }
        if(prevProps.messagesToDelete !== messagesToDelete && messagesToDelete.length !== 0){
            this.deleteMessages(messagesToDelete);
        }

    }

    setData = () => {
        const { navigation, selectedChat } = this.props;
        // const selectedChat =  navigation.getParam('selectedChat');
        const participants = selectedChat.ezProChatParticipants;
        console.log('set data');
        var arr = [];
        participants.map((val)=> {

            if(val.isActive==true){
            const s = {
                fullName: val.participant.fullName,
                id: val.participant.id
            }  
            arr.push(s)
        }
        });
        console.log('duplicate participants');
        console.log(arr);
        this.setState({
            retrievedParticipants: arr
        })
        // return arr;
    }

    addAndRemoveMessages = (recentUnReadMessages) => {
        const { selectedChat, subject } = this.props;
        const { deleteMessage: loDeleteMessage } = this.props;
        const newFormattedMessages = buildChatMessages(recentUnReadMessages, selectedChat, subject.timeZone)
        loDeleteMessage(recentUnReadMessages);
        this.setState((prevState) => {
            // console.log('PrevState: ',prevState.chatMessages)
            return {
                chatMessages: [...newFormattedMessages, ...prevState.chatMessages],
            }
        });
    }

    deleteMessages = (deletedMessages) => {
        const { selectedChat } = this.props;
        const { removeMessagesToDelete, } = this.props;
        const deletedMessagesIds = deletedMessages.map(dm => dm.id);
        this.setState((prevState) => {
            const prevMessages = [...prevState.chatMessages];
            _.remove(prevMessages, cm => {
               const  cmIncludeDm = _.includes(deletedMessagesIds, cm._id);
                return cmIncludeDm
            })
            return {
                chatMessages: [...prevMessages],
            }
        }, () => {
            removeMessagesToDelete(deletedMessages);
        });
    }

    getParticipantsNames = () => {
        const { navigation, selectedChat } = this.props;
        // const selectedChat =  navigation.getParam('selectedChat');
        const participants = selectedChat.ezProChatParticipants;
      
        // console.log(JSON.stringify(participants));
        const participantsNames = participants.filter(p => p.isActive).map(p => p.participant.fullName.split(" ")[0]);
        console.log('participants');
        console.log(participantsNames);
        this.setState({
            listOfParticipants: participantsNames
        })
        return participantsNames;
    }

    goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    addNewParticipants = () => {
    const { navigation } = this.props;
    const { isModalVisible} = this.state;
    this.setState({
        isAddModalVisible: true
    })
    }

    hideAddModal = () => {
        this.setState({
            isAddModalVisible: false
        })
    }

    openGroupInfo = () => {

        this.setState({
            isModalVisible: true
        })
        // alert('openGroupInfo');
    }

    fetchMoreChatMessages = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState(
            prevState => ({
                page: prevState.isRetrievedChatPageEmpty ? prevState.page : prevState.page + 1,
                loadingMore: true,
            }),
            () => {
                    this.retrieveChatsByChatId();
            },
            );
        }
    };
    
    retrieveChatsByChatId = async (isRefresh) => {
        const { screenProps: { t }, navigation ,selectedChat, subject } = this.props;
        
        // const selectedChat = navigation.getParam('selectedChat');
        // console.log(selectedChat.id);
        const chatId = selectedChat.id;


        // const chatId = navigation.getParam('chatId') || '4dc05683-282d-4767-af21-ce128717006b';
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
            const res = await api.get(`/chat/${chatId}?${serializeQuery(paginationParameters)}`);
            if(res.data) {
                let chatMessages = res.data.content;
                chatMessages = buildChatMessages(chatMessages, selectedChat, subject.timeZone);
                var existingMessages =[];
                // console.log("Chat messages: ",JSON.stringify(chatMessages))
                this.setState((prevState) => {
                    if(prevState.selectedChatId != chatId){
                        existingMessages = [];
                    } 
                    else {
                    // console.log('PrevState: ',prevState.chatMessages)
                        existingMessages = [...prevState.chatMessages];
                    }
                    const newMessages = [...chatMessages];
                    existingMessages.push(...newMessages);
                    return {
                        chatMessages: [...existingMessages],
                    }
                });
                this.setState({
                    loading: false,
                    loadingMore:false,
                    isRetrievedChatPageEmpty: chatMessages.length > 0 ? false : true,
                });
            } else {
                this.setState({
                    loading: false,
                    loadingMore:false,
                    isRetrievedChatPageEmpty: false
                });
            }
        } catch(error){
            console.log(error);
            showToast(t('FailedRetrieve'), 'danger', 2000);
            this.setState({
                loading: false,
                loadingMore:false,
            });
        }
    }

    onSend = (newMessages = []) => {
        const { screenProps: { t }, navigation, selectedChat } = this.props;
        // const selectedChat = navigation.getParam('selectedChat');
        const chatId = selectedChat.id;
        const newMessage = newMessages[0];
        const chatMessage = {
            ezProChat: {
                id: chatId
            },
            participantPkId: newMessage.user._id,
            messageDate: moment.utc(),
            message: newMessage.text,
            type: 'TEXT'
        }
        this.sendMessage(chatMessage);
      }

      sendOnlyAttachments = () => {
        const { screenProps: { t }, navigation, subject: { id: subjectId }, selectedChat } = this.props;
        // const selectedChat = navigation.getParam('selectedChat');
        const chatId = selectedChat.id;
        const chatMessage = {
            ezProChat: {
                id: chatId
            },
            participantPkId: subjectId,
            messageDate: moment.utc(),
            message: null,
            type: 'TEXT'
        }
        this.sendMessage(chatMessage);
      }

      appendMessages = (newMessages) => {
        const { navigation, subject, selectedChat } = this.props;
        // const selectedChat = navigation.getParam('selectedChat');
        const newFormattedMessages = buildChatMessages(newMessages, selectedChat, subject.timeZone)
        this.setState((prevState) => {
            // console.log('PrevState: ',prevState.chatMessages)
            return {
                chatMessages: [...newFormattedMessages, ...prevState.chatMessages],
            }
        });
      }

      dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }


      sendMessage = async (ezProChatMessage) => {
        // const { addOrUpdateMsgs } = this.props;
        const { fileList } = this.state;
        // console.log(fileList[0].uri);
        const formData = new FormData();
        _.map(fileList, (f) => {
            let file = f;
            if(Platform.OS=='web'){
                file = this.dataURLtoFile(f.uri, f.name);
            }
          formData.append('file', file);
        });
        formData.append('message', JSON.stringify(ezProChatMessage));
        try {
          const res = !_.isEmpty(fileList) ? await api.post('/ezProChatMessage/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }) : await api.post('/ezProChatMessage/', ezProChatMessage);
          if (res.data) {
            const msgs = _.isEmpty(fileList) ? [{ ...res.data }] : res.data;
            // this.appendMessages(msgs);
          }
          this.resetFileList();
        } catch (error) {
          console.log(error);
        }
      }

      deleteMessage = async (id) => {
        try {
            await api.put(`/ezProChatMessage/delete/${id}`) ;
          } catch (error) {
            console.log(error);
          }
      }
    
      addFiles = (file) => {
        const { fileList } = this.state;
        fileList.push(file);
        this.setFileList(fileList);
        return false;
      };

      removeAttachment = (uuid) => {
        this.setState(prevState => ({
            ...prevState,
            fileList: [...prevState.fileList.filter(f => f.uuid !== uuid)],
          }));
      }

      setFileList = (val) => {
        this.setState(prevState => ({
          ...prevState,
          fileList: val,
        }));
      }

      resetFileList = () => {
        this.setState(prevState => ({
            ...prevState,
            fileList: [],
          }));
      }

    refresh = () => {
        const { isDeviceOnline } = this.props;
        if(isDeviceOnline) {
            this.setState({
                page: 0
            });
            this.retrieveCallSchedules(true);  
        }
    }

    hideModal = () => {
        this.setState({
            isModalVisible: false
        })
    }
    
    render() {
        const{ screenProps, isDeviceOnline, subject,navigation, selectedChat, clearUnReadCount }=this.props;
        const { loading,retrievedParticipants, loadingMore,isModalVisible,listOfParticipants,isAddModalVisible } = this.state;
        console.log('retrievedParticipants');
        console.log(retrievedParticipants);
        let { chatMessages, fileList } = this. state;
   
        let emptyMessage = screenProps.t('NoCallScheduled');
        // const selectedChat = navigation.getParam('selectedChat');
        // const updateLastSeen = navigation.getParam("updateLastSeen");
        if(!isDeviceOnline) {
            chatMessages = [];
            emptyMessage = screenProps.t('NoInternet');
        }
        chatMessages = sortInReverseOrder(chatMessages);
        let ezProChatParticipants = _.filter(selectedChat.ezProChatParticipants, p => p.isActive);
        let selectedParticipants = [];
        ezProChatParticipants.map((val)=> {
            selectedParticipants.push(val.participant);   
        })
        if(_.isEmpty(selectedChat)){
            return (
                <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>
                    {screenProps.t('SelectChat')}</Text>
                    <AddSelectedPage  screenProps={screenProps} getSelectedParticipants={this.getParticipantsList} navigation={navigation} hideModal={this.hideAddModal} isModalVisible={isAddModalVisible} />
            {isModalVisible && <HeaderDialogPage getSelectedParticipants={this.getParticipantsList} selectedChat={''} navigation={navigation} screenProps={screenProps} data ={listOfParticipants} hideModal={this.hideModal} isModalVisible={isModalVisible} />}            
                </View>
            )
        }

        return (
           <View style={{flex:1}}>
           <NavigationEvents
                onDidBlur = {() => clearUnReadCount(true)}
            />

            {!isAddModalVisible && !isModalVisible && <Conversation 
            screenProps = {screenProps}
            chatMessages={chatMessages}
            fetchMoreChatMessages={this.fetchMoreChatMessages}
            loading={loading}
            loadingMore={loadingMore}
            refresh={this.refresh}
            noCallsMessage={emptyMessage}
            onSend={this.onSend}
            userId={subject.id}
            addFiles={this.addFiles}
            fileList={fileList}
            removeAttachment={this.removeAttachment}
            sendOnlyAttachments={this.sendOnlyAttachments}
            deleteMessage={this.deleteMessage}
            />}
            {isAddModalVisible && <AddSelectedPage screenProps={screenProps} getSelectedParticipants={this.getParticipantsList} navigation={navigation} hideModal={this.hideAddModal} isModalVisible={isAddModalVisible} />}
            {isModalVisible && <HeaderDialogPage getSelectedParticipants={this.getParticipantsList}  screenProps={screenProps} selectedChat={selectedChat} navigation={navigation} screenProps={screenProps} data ={listOfParticipants} hideModal={this.hideModal} isModalVisible={isModalVisible} />}
            </View>
            
        );
    }
}

const mapStateToProps = state => ({
    subject : state.subjectStudyMetaData.subject,
    isDeviceOnline: state.appStatus.isDeviceOnline,
    selectedChat: state.chat.selectedChat,
    recentUnReadMessages: state.chat.recentUnReadMessages,
    messagesToDelete: state.chat.messagesToDelete
    // selectedChat: {
    //     ezProChatParticipants:[{
    //         isActive: true,
    //         participant: {
    //             fullName: 'Mark Henry'
    //         }
    //     }, {
    //         isActive: true,
    //         participant: {
    //             fullName: 'Nathan Drake'
    //         }
    //     }, {
    //         isActive: true,
    //         participant: {
    //             fullName: 'Subject 001'
    //         }
    //     }]
    // }
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        deleteMessage,
        removeMessagesToDelete,
        clearUnReadCount,
    },
    dispatch,
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
