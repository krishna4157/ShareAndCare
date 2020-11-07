import React, { Component } from 'react';
import { Modal } from 'react-native';
import api from '../utils/api';
import { serializeQuery } from '../utils/paginationUtils';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import AddChatScreen from '../components/addChatScreen';
import HeaderDialogScreen from '../components/HeaderDialogScreen';
import { bindActionCreators } from 'redux';
import { setSelectedChat } from '../actions/chat';
import _ from 'lodash';
class HeaderDialogPage extends Component {
  state = {
    data: '',
    isModalVisible: '',
    page: 0,
    loading: false,
    loadingMore: false,
    searchValue: '',
    noOfPages: 0,
    loselectedParticipants: []
  };

  componentDidMount() {
   
    this.getData();
  }

  getData = () => {
    const {selectedChat,getSelectedParticipants} = this.props;
    var s = getSelectedParticipants();
    this.setState({
      loselectedParticipants: s
    })
  }


  
 

 
 

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  removeParticipant = async(value,id,removeParticipantNow) => {
    const {setSelectedChat: loSetSelectedChat,selectedChat}=this.props;
    try {
      console.log(value);
      const today = new Date();
      const ezProChatParticipant = {
        participantPkId : value.id,
          type: 'SITE_STAFF',
          isActive: true,
          ezProChat: {
            id : id 
          } 
      }
      console.log(ezProChatParticipant);
    const res = await api.put("/ezProChat/remove/",ezProChatParticipant);
    console.log(res.data);
    removeParticipantNow(value); 
  } catch(e){
    console.log(e);
  }
}

removeSubject = async(id,value,removeItem) => {
  const { subjectId, navigation } = this.props;
  try {
    console.log(id);
    const ezProChatParticipant = {
      participantPkId :subjectId,
        type: 'SUBJECT',
        isActive: true,
        ezProChat: {
          id : id 
        } 
    }
    console.log(ezProChatParticipant);
  const res = await api.put("/ezProChat/remove/",ezProChatParticipant);
  removeItem(value);
  navigation.goBack();
  console.log(res.data);
} catch(e){
  console.log(e);
}
}
  render() {

    const  { loselectedParticipants, } = this.state;
    const {getSelectedParticipants} = this.props;
    const { navigation,data,setSelectedChat: loSetSelectedChat,screenProps,selectedChat,subjectId, isModalVisible, hideModal } = this.props;
    console.log('retrieved participants');
    console.log(selectedChat);

    // const selectedLanguage = navigation.getParam('')
    return (

      <HeaderDialogScreen
        chatData={selectedChat!='' ? loselectedParticipants : []}
        data={selectedChat}
        subjectId={subjectId}
        selectedChatId= {selectedChat.id}
        navigation={navigation}
        screenProps={screenProps}
        hideModal={hideModal}
        isModalVisible={isModalVisible}
        removeParticipant={this.removeParticipant}
        getData={this.getData}
        removeSubject={this.removeSubject}
      />

    );
  }
}

const mapStateToProps = state => ({
  subjectId : state.subjectStudyMetaData.subject.id,
  selectedChats: state.chat.selectedChat,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
      setSelectedChat,
      
  },
  dispatch,
);

export default connect(mapStateToProps,mapDispatchToProps)(HeaderDialogPage);
