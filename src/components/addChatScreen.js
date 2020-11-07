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
import { FlatList, TouchableOpacity, View, 
  Modal as AppModal, 
  Alert, Dimensions, Platform } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import TextAvatar from 'react-native-text-avatar';
import { ScrollView } from 'react-native-gesture-handler';
// import { Carousel } from '@ant-design/react-native';
import { backgroundColor } from '../containers/NavigationScreens';
import _ from 'lodash';
import AnimatedHideView from 'react-native-animated-hide-view';
import WebModal from 'modal-react-native-web';
import { FontAwesome } from '@expo/vector-icons'; 

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

const Modal = Platform.OS === 'web' ? WebModal : AppModal;

class AddChatScreen extends Component {
  state = {
    selectedLang: '',
    selectedId: '',
    setSelectedId: '',
    isSelected: true,
    AddParticipants: [],
    selectedValues: [],
    isRefresh: true,
    searchValue: ''
  };

  componentDidMount() {
  //  this.refresh();
  // alert('Did mount');
  }

  componentWillUnmount(){
    // alert('unmount')
  }

  refresh = () => {
    const { getSelectedParticipants } = this.props;
    
    if (getSelectedParticipants != undefined) {
      var listofSelectedParticipants  = getSelectedParticipants();
      this.setState({
        selectedValues: listofSelectedParticipants,
      });
      this.setState({
        AddParticipants: []
      })
  }
  }

  clearAll = () => {
    const { getSelectedParticipants } = this.props;
    this.setState({
      selectedValues: [],
    });
    this.setState({
      AddParticipants: []
    });
  }


  addItem = (value) => {
    const { selectedValues,AddParticipants } = this.state;
    var selectedValue = selectedValues;
    var addP = AddParticipants;
   
    if (_.find(selectedValue, value) == undefined) {
      // addP.push(value);
      selectedValue.push(value);
      this.setState({
        selectedValues: selectedValue
      })
      addP.push(value);
      this.setState({
        AddParticipants: addP
      })
     
    } else {
      this.removeItem(value);
    }
  }

  showWarningMessage = (value) => {
    Alert.alert(
      '',
      `Do you want to remove ${value.fullName} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => true,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.removeItem(value)},
      ],
      {cancelable: false},
    );
  }

  removeItem = (value) => {
    const { selectedValues,AddParticipants } = this.state;
    var selectedValue = selectedValues;
    var addP = AddParticipants;
    const selectedData = _.remove(selectedValue, function(n) {
      return n.id != value.id;
    });
    const addPData = _.remove(addP, function(n) {
      return n.id != value.id;
    });
      this.setState({
        selectedValues: selectedData
      })
      this.setState({
        AddParticipants: addPData
      })
  }

  isSelected = (value) => {
    const {selectedParticipantIds}= this.props;
    var ids = selectedParticipantIds;
    if(ids.includes(value.id)){
      return true;
    } else {
      return false
    }
  }

  clearValues = () => {
    this.setState({
      selectedValues: []
    })
  }
  


  renderItem = ({ item }) => {
    const {subjectId}= this.props;
    const { selectedValues } = this.state;
    if(item.id!=subjectId){
    return (
      <TouchableOpacity disabled={this.isSelected(item)} onPress={() => {
          this.addItem(item);
      }} style={{ padding: 10,flex:1,flexDirection: 'row' }} >
        <View style={{flex:5.5,flexDirection:'row',alignContent:'center',flexWrap:'wrap'}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{alignSelf:'center'}}> 
              <TextAvatar
                backgroundColor={'#4e89ae'}
                textColor={'white'}
                size={50}
                type={'circle'}
              >
                {JSON.stringify(item.fullName)}
              </TextAvatar>
            </View>
            <View style={{flexShrink:1,alignSelf:'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
                {item.fullName}
              </Text>
            </View>
          </View>
        </View>
          
         
        <View style={{ flex: 0.5, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
          
          {_.find(selectedValues,{ 'fullName': item.fullName})!=undefined ?
            // <AntDesign name="checkcircle" size={24} color="#4e89ae" />
            <FontAwesome name="check-circle" size={24} color="#4e89ae" />
            :
            <Entypo name="circle" size={24} color="#4e89ae" />
             }
        </View>
      </TouchableOpacity>
    
    );
            }
  };

  renderSelectedParticipants = () => {
    const {subjectId}= this.props;
    const { selectedValues } = this.state;
    return (
      <ScrollView horizontal={true} >
        <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start' }}>
          {selectedValues.map((value) => {
            if(value.id!=subjectId){
            return (
              <View style={{ padding: 5, width: 90, marginRight: -20 }} >
                <View style={{ flexWrap: 'wrap', overflow: 'hidden' }}>
                  <TouchableOpacity disabled={this.isSelected(value)} onPress={() => {
                        this.addItem(value);
                  }}>
                    <TextAvatar
                      backgroundColor={backgroundColor}
                      textColor={'white'}
                      size={55}
                      type={'circle'}
                    >
                      {JSON.stringify(value.fullName)}
                    </TextAvatar>
                    {/* <AntDesign style={{ backgroundColor: 'white', borderRadius: 30, position: 'absolute', marginLeft: 40 }} name="closecircle" size={20} color="red" /> */}
                  <View />
                  </TouchableOpacity>
                </View>

              </View>
            );
                }

          })}
        </View>
      </ScrollView>
    )
  }

  renderListEmptyComponent = () => {
    const { noChatsMessage } = this.props;
    const {screenProps} = this.props;
    return (
      <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{screenProps.t('NoUsersFound')}</Text>
      </View>
    )
  }

  render() {
    const { data, hideModal,screenProps,getSelectedParticipants,defaultValues, isModalVisible,navigateToConverstation, navigation, refresh,setPageInitial, loading, retrieveSearchData, checkData, fetchMoreData, fetchMoreSearchData } = this.props;
    const { selectedLang } = this.state;
    const { selectedId, selectedValues, searchValue,AddParticipants } = this.state;
    console.log('selectedValues');
    console.log(selectedValues);
    return (
     
          <Modal
        style={{width:'100%',height:'100%'}}
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onShow= {()=> {
            if(getSelectedParticipants==undefined){
              this.clearAll();
            } else {
              this.refresh();
            }
          }}

          onDismiss={()=>{
            this.clearAll();
          }}
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
                <Title style={{ color: '#fff' }}>{screenProps.t('AddParticipants')}</Title>
              </Body>
              <Right>
                <TouchableOpacity onPress={() => {
                  hideModal();
                  navigateToConverstation(selectedValues,AddParticipants);
                }} >
                  <Text style={{ color: 'white' }}>
                    {screenProps.t("Done")}
                  </Text>
                </TouchableOpacity>
              </Right>
            </Header>


            <View>
              <Item>
                {/* <AntDesign name="search1" size={24} color="black" style={{ padding: 5 }} /> */}
                <Input
                  onChangeText={(val) => {
                    setPageInitial();
                    checkData(val);
                    this.setState({
                      searchValue: val
                    });
                  }}
                  style={{ padding: 10 }}
                  placeholder={screenProps.t('SearchParticipants')}
                  // placeholder={'Search Participants'}
                
                />
              </Item>
              {this.renderSelectedParticipants()}
            </View>

            <Content>

              <FlatList
                extraData={this.state}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.name}
                onEndReached={searchValue != '' ? fetchMoreSearchData : fetchMoreData}
                onEndReachedThreshold={0.1}
                onRefresh={refresh}
                refreshing={loading}
                ListEmptyComponent={this.renderListEmptyComponent}
              />
            </Content>
          </Container>
          </View>
          </Modal>
        
    );
  }
}

export default AddChatScreen;
