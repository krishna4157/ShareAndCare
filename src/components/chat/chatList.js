import React from 'react';
import { View, Text, Icon, Fab } from 'native-base';
import _ from 'lodash';
import { FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ChatItem from './chatItem';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Feather } from '@expo/vector-icons';
import CloseIcon from '@material-ui/icons/Close';
import AddChatScreenPage from '../../containers/AddChatScreenPage';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';

class ChatList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isModalVisible : false
        }
    }

    renderListEmptyComponent = () => {
      const { noChatsMessage } = this.props;
      return (
          <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#546e7a', fontFamily: 'Raleway', fontSize: 14 }}>{noChatsMessage}</Text>
          </View>
      )
  }

  getItemSeperator = () => {
    return (
      <View style = {{ borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8'}}>
      </View>
    )
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

    render(){
        const { chats, fetchMoreChats,navigation,screenProps, loading, refresh, timeZone, setSelectedChatAndNavigate,clearSelectedChat } = this.props;
        const  { isModalVisible}= this.state;
        let {height } = Dimensions.get('window');
        return(
            <View style={{flex:1}}>
                            {!loading && this.state.isModalVisible && <AddChatScreenPage screenProps={screenProps} selectedParticipants={''} navigation={navigation} hideModal={this.hideModal} isModalVisible={isModalVisible} />}

            <View style={{flex:1, padding: 10}}>

                <NavigationEvents
                  onDidFocus={() => {
                    clearSelectedChat();
                    // alert('Did focus');
                  }}
                  // onWillFocus={() => {
                  //   clearSelectedChat();
                  //   // alert('Will focus');
                  // }}
                />
              {loading && (
              <View
                style={{
                  height: height - height * (1 / 4),
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator
                  size="large"
                  color='#0d47a1'
                  animating={true}
                  key={loading ? "loading" : "not-loading"}
                />
              </View>
            )}
              {!loading && !this.state.isModalVisible && <FlatList
              data={chats}
              onEndReached={fetchMoreChats}
              onEndReachedThreshold={0.5}
              onRefresh={refresh}
              refreshing={loading}
              ListEmptyComponent={this.renderListEmptyComponent}
              // ItemSeparatorComponent = {this.getItemSeperator}
              renderItem={({ item: chat }) => (
              <ChatItem
                  chat = {chat}
                  timeZone = {timeZone}
                  setSelectedChatAndNavigate = {setSelectedChatAndNavigate}
              />
              )}
            />
              }
              {
                !loading && <View style={{flex:1,alignSelf:'flex-end',height:'95%',alignItems:'flex-end',justifyContent:'flex-end',position:'absolute'}}>
                  {Platform.OS !='web' ? <Fab onPress={()=> {
                    this.setState({
                      isModalVisible: true
                    })
                  }} position = "bottomRight"
                    style = {{ backgroundColor: '#0d47a1'}}
                  >
                    <Feather name="plus" size={24}  />
                  </Fab> 
                  :
                  !isModalVisible && <FloatingMenu 
    slideSpeed={500}
    direction="up"
    spacing={8}
    isOpen={this.state.isModalVisible}
  >
    <MainButton
    background={'#0d47a1'}
      iconResting={<AddIcon htmlColor='white' style={{ fontSize: 25 }} nativeColor="white" />}
      // iconActive={<CloseIcon htmlColor='white' style={{ fontSize: 25 }}/>}
      onClick={() => {
        // hideModal={this.hideModal} isModalVisible={isModalVisible}
        // navigation.navigate('AddChatScreenPage',{ hidemodal: this.hideModal})    
        this.setState({ isOpen: !this.state.isOpen,
      isModalVisible: !this.state.isModalVisible })
    }}
      size={50}
    />
  </FloatingMenu>
  }
                  </View>
              }
            </View>
            </View>
        );
    }
}

export default ChatList;
