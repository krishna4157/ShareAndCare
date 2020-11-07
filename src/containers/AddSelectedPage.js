import React, { Component } from 'react';
import { Modal } from 'react-native';
import api from '../utils/api';
import { serializeQuery } from '../utils/paginationUtils';
import showToast from '../utils/toast';
import { connect } from 'react-redux';
import AddChatScreen from '../components/addChatScreen';
import { bindActionCreators } from 'redux';
import { setSelectedChat, addMessageToSelectedChat, reduceUnReadChatsBy1, addMessageToDeleteAction } from '../actions/chat';

class AddChatScreenPage extends Component {
  state = {
    data: '',
    isModalVisible: '',
    page: 0,
    loading: false,
    loadingMore: false,
    searchValue: '',
    noOfPages: 0,
    isRefresh: false,
    loGetSelectedParticipants: []
  };

  componentDidMount() {
    this.retrieveData();
    this.refresh();
  }


  fetchMoreData = () => {

    const { searchValue } = this.state;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        // if(searchValue!=''){
        //   this.retrieveSearchData(searchValue);
        // } else {
        this.retrieveData();
        // }
      },
    );

  };

  fetchMoreSearchData = () => {
    const { searchValue } = this.state;

    this.setState(
      prevState => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        // if(searchValue!=''){
        //   this.retrieveSearchData(searchValue);
        // } else {
        // this.retrieveSearchData(searchValue);
        // }
      },
    );
  }

  retrieveSearchData = async (value) => {
    const { page, loadingMore, data ,noOfPages,isRefresh} = this.state;
    const { clientID } = this.props;
    this.setState({
      searchValue: value
    })
    if(isRefresh==true){
      this.setState({
        noOfPages:0,
        isRefresh: false
      });
    }
   
    if (!loadingMore) {
      this.setState({
        loading: true,
      })
    }
    try {
      const paginationParameters = {
        size: 8,
        page: noOfPages,
      };

      const res = await api.get(`/ezProChat/studysite/fullNameFilter/${clientID}/${value}?${serializeQuery(paginationParameters)}`);
      
      console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
      console.log('value : '+value);
      console.log(res.data.content);
      
        const retrievedData = res.data;
      
        if(retrievedData!=''){
        
          if(noOfPages>0){
          this.setState((prevState) => {
            
            var prevData = prevState.data;
            var dataRetrieved = retrievedData.content;
            
            if(dataRetrieved!=undefined) {
              
              var prevDataIds = [];
              var filteredData = [];
              prevData.map((value)=>{
                prevDataIds.push(value.id);
              }) 
              dataRetrieved.map((value) => {
                if(!prevDataIds.includes(value.id)){
                  filteredData.push(value); 
                }
              })
                var finalData = prevData.concat(filteredData);                
            return {
                data: finalData,
                loading: true,
                loadingMore: true,
                noOfPages: noOfPages+1
            }

          } else {
            return {
              data:  prevState.data,
              loading: false,
              loadingMore: false
            }
            
          }
          })
          this.setState({
            noOfPages: noOfPages+1
          })
        this.retrieveSearchData(value);

        } else if(noOfPages==0) {
          this.setState({
            data: retrievedData.content,
          });
          this.setState({
            noOfPages: noOfPages+1
          })
         this.setState({
           isRefresh: false
         })
          this.retrieveSearchData(value);       
        }
       
       
       
        // this.retrieveSearchData(value);       
      }

      else {
      
        this.setState({
          loading: false,
          loadingMore: false,
          noOfPages:0
        })
      }  
//       else {
//         this.setState({
//    data: retrievedData.content,
//    loading: false,
//    loadingMore: false
//  });
// }
      
    } catch (e) {
      console.log(e);
      showToast('Failed to Retrieve', 'danger', 2000);
      this.setState({
        loading: false,
        loadingMore: false,
      });
    }

  }

  checkData = (val) => {
    console.log(val);
    if (val != '') {
      this.setState({
        data: [],
        loading: true,
        loadingMore: true,
        noOfPages:0
      });
      this.setState({
        isRefresh: true
      })
      this.retrieveSearchData(val);
      
    } else {
      this.retrieveData(true);
    }
  }

  retrieveData = async (isRefresh) => {
    const { page, loadingMore, data } = this.state;
    console.log('retrieve data');
    const { clientID } = this.props;
    if (!loadingMore) {
      this.setState({
        loading: true,
      })
    }
    try {
      const paginationParameters = {
        size: 8,
        page: isRefresh ? 0 : page,
      };
      const res = await api.get(`/ezProChat/studysite/${clientID}?${serializeQuery(paginationParameters)}`);
      
      if (res.data) {
        const retrievedData = res.data;
        if (retrievedData.content != '') {
          this.setState(prevState => ({
            data: isRefresh ? retrievedData.content : [...prevState.data, ...retrievedData.content],
          }));
        } else {
          this.setState({
            data: retrievedData.content
          })
        }
      }
      this.setState({
        loading: false,
        loadingMore: false,
      });
    } catch (e) {
      console.log(e);
      showToast('Failed to Retrieve', 'danger', 2000);
      this.setState({
        loading: false,
        loadingMore: false,
      });
    }

  }

  setPageInitial = () => {
    this.setState({
      page: 0
    });
    this.setState({
      noOfPages:0
    })
  }

  refresh = () => {
    const { isDeviceOnline ,getSelectedParticipants} = this.props;
    
    this.setState({
      page: 0,
      loGetSelectedParticipants: getSelectedParticipants
    });

  }

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  navigateToConverstation = async(selectedValues,AddParticipants) => {
    const  { navigation,subjectId,chatId, setSelectedChat: loSetSelectedChat  } = this.props;
    const {screenProps:{t}}=this.props;
    const today = new Date();
    console.log("Chat iD");
    console.log(chatId);
    var getSelectedParticipants = [];
    AddParticipants.map((val)=> {
    
      const obj = {
        ezProChat: {
          id: chatId,
        },
        participantPkId: val.id,
        type: 'SITE_STAFF',
        lastSeenDate: today,
        isActive: true
      };
      
      getSelectedParticipants.push(obj)
    })
    // const subject = {
    //   ezProChat: {
    //     id: chatId,
    //   },
    //   participantPkId : subjectId,
    //   type: 'SUBJECT',
    //   lastSeenDate: today,
    //   isActive: true
    // }
    // getSelectedParticipants.push(subject);
    try {
    const res = await api.put(`/addParticipants/${chatId}`,getSelectedParticipants);
    if(res.data){
      const selectedChat = res.data;
      loSetSelectedChat(selectedChat.chat);
      // showToast(selectedChat, 'success', 9000);
     
      if(selectedChat.isNewChat==false){
        navigation.navigate('Conversation', {
            selectedChat: selectedChat.chat,
            updateLastSeen: () => this.updateLastSeen(selectedChat.chat.id),
          });
      }  
  }
  } catch(e) {
    
    console.log(e);
    showToast(t('SomethingWrong'), 'danger', 3000);
  }
    
  }

  updateLastSeen = async (selectedChatId) => {
    const { subjectId, updateUnreadCount } = this.props;
    const ezProChatParticipant = {
      ezProChat: {
        id: selectedChatId,
      },
      participantPkId: subjectId,
      lastSeenDate: moment().utc(),
    };
    
    try {
      await api.put('/ezProChatParticipant/lastSeen/update', ezProChatParticipant);
      // this.updateUnreadCount(selectedChatId);
    } catch (error) {
      console.log(error);
    }
  }


  render() {


    const { data, loading } = this.state;
    const { navigation,subjectId, clientID, isModalVisible, hideModal,getSelectedParticipants } = this.props;
    const { screenProps } = this.props;
    
    console.log(getSelectedParticipants);
    let selectedParticipantsIds = [];
    if(getSelectedParticipants!=''){
      var listOfSelectedParticipants = getSelectedParticipants();
        selectedParticipantsIds = listOfSelectedParticipants.map((val)=> {
        return val.id;
    }) 
    }
    // const selectedLanguage = navigation.getParam('')
    return (

      <AddChatScreen
        fetchMoreSearchData={this.fetchMoreSearchData}
        getSelectedParticipants={getSelectedParticipants}
        selectedParticipantIds= {selectedParticipantsIds || ''}
        data={data}
        navigateToConverstation={this.navigateToConverstation}
        setPageInitial={this.setPageInitial}
        navigation={navigation}
        screenProps={screenProps}
        retrieveData={this.retrieveData}
        fetchMoreData={this.fetchMoreData}
        defaultValues={true}
        checkData={this.checkData}
        retrieveSearchData={this.retrieveSearchData}
        refresh={this.refresh}
        loading={loading}
        noChatsMessage={'No Participants Found.'}
        hideModal={hideModal}
        isModalVisible={isModalVisible}
        subjectId={subjectId}
      />

    );
  }
}

const mapStateToProps = state => ({
  clientID: state.subjectStudyMetaData.studySite.client.id,
  subjectId : state.subjectStudyMetaData.subject.id,
  chatId : state.chat.selectedChat.id

});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
      setSelectedChat,
  },
  dispatch,
);

export default connect(mapStateToProps,mapDispatchToProps)(AddChatScreenPage);
