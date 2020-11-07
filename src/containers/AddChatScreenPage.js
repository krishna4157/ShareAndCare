import React, { Component } from 'react';
import { Modal, Dimensions } from 'react-native';
import api from '../utils/api';
import { serializeQuery } from '../utils/paginationUtils';
import showToast from '../utils/toast';
import { connect } from 'react-redux';
import AddChatScreen from '../components/addChatScreen';
import { setSelectedChat, addMessageToSelectedChat, clearUnReadCount} from '../actions/chat';
import { bindActionCreators } from 'redux';
import AnimatedHideView from 'react-native-animated-hide-view';
const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

class AddChatScreenPage extends Component {
  state = {
    data: '',
    isModalVisible: '',
    page: 0,
    loading: false,
    loadingMore: false,
    searchValue: '',
    noOfPages: 0,
    isRefresh: false
  };

  componentDidMount() {
    this.retrieveData();
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
    const { searchValue,noOfPages } = this.state;

    this.setState(
      prevState => ({
        page: prevState.page + 1,
        // noOfPages: noOfPages+1,
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
       
       
      }

      else {
      
        this.setState({
          loading: false,
          loadingMore: false,
          noOfPages:0
        })
      }  
      
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
    const { isDeviceOnline } = this.props;

    this.setState({
      page: 0
    });

  }

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  navigateToConverstation = async(selectedValues,AddParticipants) => {
    const  { navigation,setSelectedChat: loSetSelectedChat ,subjectId} = this.props;
    const today = new Date();
    var selectedParticipants = [];
    selectedValues.map((val)=> {
      const obj = {
       
          participantPkId : val.id,
          type: 'SITE_STAFF',
          lastSeenDate: today,
          isActive: true
      };
      selectedParticipants.push(obj)
    });
    const subject = {
      participantPkId : subjectId,
      type: 'SUBJECT',
      lastSeenDate: today,
      isActive: true
    }
    selectedParticipants.push(subject);
    const ezProChat = {
      chatDate : today,
      ezProChatParticipants : selectedParticipants
    };
    // console.log(ezProChat);
    try {
    const res = await api.post("/ezProChat/",ezProChat);
    // ,{ ezProChat });
    // console.log(res.data);
    if(res.data){
      const selectedChat = res.data.chat;

      loSetSelectedChat(selectedChat);
      navigation.navigate('Conversation', {
        selectedChat: selectedChat,
        // updateLastSeen: ()=>{}
    })
  }
  } catch(e) {
    console.log(e);
  }
    
  }

  render() {


    const { data, loading } = this.state;
    const { navigation, clientID, isModalVisible, hideModal,subjectId } = this.props;
    const selectedParticipants = '';
    const  {screenProps}= this.props;
    // const selectedLanguage = navigation.getParam('')
    return (
      // <AnimatedHideView
      // duration={150}
      // visible={isModalVisible}
      // // style={ [{zIndex: currentOrdinal === currentField.ordinal ? 3 : 0 },Platform.OS !== 'web' &&{flex: 1, paddingLeft: wp('3%'), paddingRight: wp('3%'), width: Dimensions.get('window').width, position: 'absolute'}]}>
      // style={ SCREEN_WIDTH > 1024 ? { position: 'absolute', width:'100%'} :
      // {flex: 1, width: Dimensions.get('window').width, position: 'absolute'}}>
      <AddChatScreen
      screenProps={screenProps}
      selectedParticipantIds={[]}
        fetchMoreSearchData={this.fetchMoreSearchData}
        getSelectedParticipants={()=>{return []}}
        data={data}
        navigateToConverstation={this.navigateToConverstation}
        setPageInitial={this.setPageInitial}
        navigation={navigation}
        retrieveData={this.retrieveData}
        fetchMoreData={this.fetchMoreData}
        checkData={this.checkData}
        retrieveSearchData={this.retrieveSearchData}
        refresh={this.refresh}
        loading={loading}
        subjectId={subjectId}
        noChatsMessage={'No Participants Found.'}
        hideModal={hideModal}
        isModalVisible={isModalVisible}
      />
      // </AnimatedHideView>

    );
  }
}

const mapStateToProps = state => ({
  clientID: state.subjectStudyMetaData.studySite.client.id,
  subjectId : state.subjectStudyMetaData.subject.id,

});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
      setSelectedChat,
      addMessageToSelectedChat,
      clearUnReadCount,
  },
  dispatch,
);

export default connect(mapStateToProps,mapDispatchToProps)(AddChatScreenPage);
