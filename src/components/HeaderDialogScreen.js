import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Input,
  Item,
  Button,
  Header,
  Body,
  Left,
  Title,
  Right,
} from 'native-base';
import { FlatList, TouchableOpacity, View, Modal as AppModal, Alert, Dimensions, Platform } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import TextAvatar from 'react-native-text-avatar';
import { ScrollView } from 'react-native-gesture-handler';
// import { Carousel } from '@ant-design/react-native';
import { backgroundColor } from '../containers/NavigationScreens';
import _ from 'lodash';
import AnimatedHideView from 'react-native-animated-hide-view';
import WebModal from 'modal-react-native-web';

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

const Modal = Platform.OS === 'web' ? WebModal : AppModal;

class HeaderDialogScreen extends Component {
  state = {
    selectedLang: '',
    selectedId: '',
    setSelectedId: '',
    isSelected: true,
    participantData: [],
    isRefresh: true,
    searchValue: ''
  };

  componentDidUpdate(prevProps){
    const  {chatData} = this.props;
    if(prevProps.chatData!==chatData){
      this.setState({
        participantData: chatData
      });
    }
    
   
    

  }

  refresh=()=>{
    const {chatData,getData} = this.props;
    getData();
    this.setState({
      participantData: chatData
    });

  }

  getSubjectDetailsAndRemove = () => {
    const { participantData } = this.state;
    const {subjectId } = this.props;
    var selectedValue = participantData;
    var subject = _.filter(selectedValue, function(n) {
      return n.id == subjectId;
    });
    this.showSubjectWarningMessage(subject[0]);
    // alert(JSON.stringify(subject));
  }

  showSubjectWarningMessage = (value) => {
    const {selectedChatId, removeSubject}= this.props;
    Alert.alert(
      '',
      `Do you want to Leave this group ?`,
      [
        {
          text: 'Cancel',
          onPress: () => true,
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>   {
        //  alert('hello');
          removeSubject(selectedChatId,value,this.removeItem)
        },}
      ],
      {cancelable: false},
    );
  }

  showWarningMessage = (item,selectedChatId) => {
    const {removeParticipant}= this.props;
    Alert.alert(
      '',
      `Do you want to remove ${item.fullName} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => true,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          removeParticipant(item,selectedChatId,this.removeItem);
          // this.removeItem(item);
        },}
      ],
      {cancelable: false},
    );
  }

  removeItem = (value) => {
    const { participantData } = this.state;
    var selectedValue = participantData;
    const selectedData = _.remove(selectedValue, function(n) {
      return n.id != value.id;
    });
      this.setState({
        participantData: selectedData
      });
  }

  // removeParticipantNow = (value) => {
  //   this.showWarningMessage(value);
  // }


  renderItem = ({ item }) => {
   const  {selectedChatId,removeParticipant,subjectId,screenProps} = this.props;

    return (
      <View  style={{ padding: 10, flexDirection: 'row' }} >
        <TextAvatar
          backgroundColor={'#4e89ae'}
          textColor={'white'}
          size={50}
          type={'circle'} // optional
        >
          {JSON.stringify(item.fullName)}
        </TextAvatar>
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
          <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{item.fullName}</Text>
        </View>
        <View>
       {item.id != subjectId ? <TouchableOpacity  onPress ={()=> {
         this.showWarningMessage(item,selectedChatId,this.removeParticipantNow);
         
         
       }} style={{borderWidth:1,marginTop:10,borderRadius:5,borderColor:'#4e89ae',height:30,width:80,justifyContent:'center',alignItems:'center'}}>
         <Text style={{textAlign:'center'}}>{screenProps.t('Remove')}</Text>
       </TouchableOpacity>: <View />}
       </View>
      </View>
    );
  };


  renderListEmptyComponent = () => {
    const { noChatsMessage ,screenProps} = this.props;
    return (
      <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{screenProps.t('NoUsersFound')}</Text>
      </View>
    )
  }

  render() {
    const { data,removeSubject,screenProps,selectedChatId, hideModal, isModalVisible, navigation, refresh,chatData  } = this.props;
    const {participantData } = this.state;

    return (
      // <View>
      

<Modal
 style={{width:'100%',height:SCREEN_HEIGHT}}
        onShow={()=>this.refresh()}
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
        >
          <View style={ Platform.OS == 'web' && SCREEN_WIDTH >= 1030 ? {flex:1, alignItems:'center', backgroundColor:'#b0bec5', overflow:'hidden' }: {flex:1}}>
          <Container style={ Platform.OS == 'web' ? { width: SCREEN_WIDTH >= 1030 ? 380: '100%', height: '99%' } : { width: '100%', backgroundColor: '#fff', alignSelf: 'center' }}>

            <Header style={{ backgroundColor: backgroundColor }}>
              <Left style={{ alignContent: 'flex-start', width: 10, }}>
                <TouchableOpacity onPress={() => {
                  hideModal();
                }}>
                  <Text>
                    <MaterialIcons name="arrow-back" color="white" size={24} />
                  </Text>
                </TouchableOpacity>
              </Left>
              <Body style={{ alignContent: 'flex-start', }}>
                <Title style={{ color: '#fff' }}>{screenProps.t('Participants')}</Title>
              </Body>
              <Right>
              </Right>
            </Header>
            <Content>

<FlatList
  data={participantData}
  renderItem={this.renderItem}
  ListEmptyComponent={this.renderListEmptyComponent}
/>
<Button onPress={()=> {
  this.getSubjectDetailsAndRemove();
//  removeSubject(selectedChatId,this.getSubjectDetailsAndRemove);
}}  transparent style={{borderColor:'red',borderWidth:1,justifyContent:'center',margin:15,marginTop:30}}>
    <Text style={{textAlign:'center',alignSelf:'center',color:'red'}}>{screenProps.t('LeaveGroup')}</Text>
    </Button>
</Content>
          </Container>
          </View>
          </Modal>
    );
  }
}

export default HeaderDialogScreen;
