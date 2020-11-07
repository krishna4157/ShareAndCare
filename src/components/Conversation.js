import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView,
    TouchableOpacity, Image, Clipboard, Alert } from 'react-native';
// import { Video } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { Header } from 'react-navigation-stack';
import { GiftedChat, IMessage, Send, Bubble, MessageText, Time, Actions, Message, InputToolbar } from 'react-native-gifted-chat';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo, Feather, Foundation } from '@expo/vector-icons';
// import DocumentPicker from 'react-native-document-picker';
// import fileType from 'react-native-file-type';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
const { width } = Dimensions.get('window');
import { messages as chatMessages } from '../constants/chatMessagesMockData';
import { backgroundColor } from '../containers/NavigationScreens';
import AttachedFilePreview from './AttachedFilePreview';
import { getFileType } from '../utils/chatUtils';
import { v4 as uuidv4 } from 'uuid';
import api from '../utils/api';
import KeyboardShift from './KeyboardShift';
// TODO: add firebase?

class Conversation extends React.Component {
    // state = {
    //     messages: 
    // }
    state = {
        imageError: false,
        openAttachmentList: false,
        sizeExceded: false,
        filesLengthExceeded: false,
    }

    hideAttachmentList = () => {
        this.setState({
            openAttachmentList: false,
        })
    }
  

    renderSend(props) {
        return (
            <Send
                {...props}
            >
            <View style={{marginLeft: 15, marginRight: 15, padding: 7, backgroundColor: backgroundColor, borderRadius: 50}}>
                    <MaterialIcons name="send" size={22} color={'#fff'} />
                    </View>
            </Send>
        );
    }

    renderBubble(props) {
        return (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        left: {
                    backgroundColor: '#fff',
                    marginTop: 10,
                    },
                    right: {
                    backgroundColor: '#e3f2fd',
                    color: 'black',
                    marginTop: 10,
                    }
                    }}
                />
            );  
        }

        renderChatFooter = () => {
            <View style={{ paddingVertical: 20}}></View>
        }

        renderInputToolBar = (props) => {
            return (
                <InputToolbar
                {...props}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        // paddingTop: 6,
                        borderTopColor: "transparent",
                        marginBottom: 10,
                        // paddingBottom: 15, 
                    }}
                    primaryStyle={{
                        alignItems: 'center',
                    }}
                />
            )
        }

        renderMessageText(props) {
            const  currentMessage = props.currentMessage;
            const openAttachment = async(messageId) => {
                try {
                    const res = await api.get(`/chat/publicUrl/generate/${messageId}`);
                    const url = res.data.url;
                    Linking.openURL(url);
                } catch(error) {
                    console.log(error)
                }
            }
            if(currentMessage.messageType !== 'FILE') {
                return (
                    <MessageText
                    {...props}
                    textStyle={{
                        right: {
                            color: 'black'
                        }
                    }}/>
                )
            } else {
                return (
                    <View style={{ flexShrink:1,paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10, flexDirection: 'row'}}>
                        <MaterialCommunityIcons name="paperclip" size={24} color="#0277bd" />
                        <Text
                        numberOfLines={1}
                        onPress={() => openAttachment(currentMessage._id)}
                        style={{ color: '#0277bd', paddingLeft: 5,flexWrap:'wrap'}}>{currentMessage.fileName}
                        </Text>
                    </View>
                );
            }
            
        }

        renderMessage(props) {
            const  currentMessage = props.currentMessage;
            if(currentMessage.messageType !== 'FILE') {
                return (
                    <Message
                    {...props}/>
                )
            } else {
                return (
                    <Message
                    {...props}/>
                )
            }
        }

        renderTime(props) {
            return (
                <Time
                {...props}
                timeTextStyle={{
                    right: {
                        color: '#B4B4B4'
                    },
                }}/>
            )
        }

        renderActions(props) {
            const options = {
                'Attach File': async (props) => {
                  console.log('pick image');
                },
                'Cancel': () => {
                  console.log('cancel');
                }
              };
            return (
                <Actions
                {...props}
                // options={options}
                icon={() => (<MaterialCommunityIcons name="paperclip" size={24} color="black" />)}
                >
                    {/* <TouchableOpacity onPress={() => alert('Attach!')}>
                        <MaterialCommunityIcons name="paperclip" size={24} color="black" />
                    </TouchableOpacity> */}
                    </Actions>
            )
        }

        pickAttachment = async () => {
            const { openAttachmentList } = this.state
            const { addFiles,fileList } = this.props;
            // if(!openAttachmentList) {
            try {
                this.setState({openAttachmentList: true})
                const file = await DocumentPicker.getDocumentAsync({
                    copyToCacheDirectory: false,
                    multiple: true
                });
                // alert("Hey! file picked");
                // console.log(file);
                // alert(JSON.stringify(file));
                // alert('uuid:'+uuidv4())
                if(file.type === 'success'){
                    // const fileMeta = await fileType(file.uri);
                    const fileWithType = {
                        ...file,
                        type: getFileType(file.name),
                        uuid: Math.random().toString().split('.')[1],
                    };
                    var isSizeValid = this.checkSizeExceeded(fileList,file);
                    var isLengthValid = fileList.length+1 <= 5 ? true : false ;
                    if(isSizeValid==true && isLengthValid == true ){
                    // alert(JSON.stringify("fileType: "+fileWithType));
                        addFiles(fileWithType);
                   
                    } else if (isLengthValid == false) {
                       
                       this.setState({
                        filesLengthExceeded: true
                       })
                       setTimeout(()=> {
                        this.setState({
                            filesLengthExceeded: false
                        })   
                       },4000);
                    } else if (isSizeValid==false){
                        this.setState({
                            sizeExceded: true
                        });
                        setTimeout(()=> {
                            this.setState({
                                sizeExceded: false
                            })
                        },4000);
                    
                    }
                }
                console.log(fileWithType);
                // }
               
              } catch (err) {
                  console.log("Cannot pick",err)
                //   alert(JSON.stringify(error));
              }
            // } else {
            //     this.hideAttachmentList();
            // }
        }

        // openAttachment = async(messageId) => {
        //     try {
        //         const res = await api.get(`/chat/publicUrl/generate/${messageId}`);
        //         const url = res.data.url;
        //         Linking.openURL(url);
        //     } catch(error) {
        //         console.log(error)
        //     }
        // }

        onMessageSent = (newMessages) => {
            const { onSend } = this.props;
            onSend(newMessages);
            this.hideAttachmentList();
        }

        onLongPressMessage = (chatContext, currentMessage) => {
           const { userId } = this.props;
            let options = [
                'Copy Text',
                'Cancel',
            ];
            if(currentMessage.user._id.toLowerCase() === userId.toLowerCase()) {
                options = [
                    'Copy Text',
                    'Delete Message',
                    'Cancel',
                ];
                const cancelButtonIndex = options.length - 1;
                chatContext.actionSheet().showActionSheetWithOptions({
                    options,
                    cancelButtonIndex,
                }, (buttonIndex) => this.onLongPressSentMessage(buttonIndex, currentMessage));
            } else {
                const cancelButtonIndex = options.length - 1;
                chatContext.actionSheet().showActionSheetWithOptions({
                    options,
                    cancelButtonIndex,
                }, (buttonIndex) => this.onLongPressRecievedMessage(buttonIndex, currentMessage));
            }
           
            
          }

          onLongPressSentMessage = (buttonIndex, currentMessage) => {
            switch (buttonIndex) {
                case 0:
                    Clipboard.setString(currentMessage.text);
                    break;
                case 1:
                    this.showDeleteAlert(currentMessage)
                    break;    
                }
          }

          showDeleteAlert = (currentMessage) => {
            Alert.alert(
                "Delete Message",
                "Are you sure you want to delete this message",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Delete", onPress: () => this.deleteMessage(currentMessage._id) }
                ],
                { cancelable: false }
              );
          }

          onLongPressRecievedMessage = (buttonIndex, currentMessage) => {
            switch (buttonIndex) {
                case 0:
                    Clipboard.setString(currentMessage.text);
                    break;
                }
          }

          deleteMessage = (id) => {
              const { deleteMessage: loDeleteMessage } = this.props;
              loDeleteMessage(id);
          }

          checkSizeExceeded =(fileList,file) => {
            var maxBytes =0;  
            var mb20 = 20971520;
            fileList.map((value) => {
                maxBytes = maxBytes+value.size;
              });
              maxBytes = maxBytes + file.size;
              
              if(maxBytes>mb20){
                 return false;
              } else {
                  this.setState({
                      sizeExceded: false
                });
                return true;
               
              }
          }

          
    
      render() {

        const { chatMessages, onSend, userId, fetchMoreChatMessages, loadingMore, fileList, removeAttachment, sendOnlyAttachments } = this.props;
        const { openAttachmentList,sizeExceded,filesLengthExceeded } = this.state;
        return (
            <KeyboardShift>
            {() => (
                <View style={{ flex:1}}>
                <GiftedChat
                inverted={false}
                isKeyboardInternallyHandled={false}
                textInputStyle={{
                    // borderWidth: 1,
                    // borderColor: '#bdbdbd',
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    backgroundColor: '#fff'
                }}
                renderAvatar={null}
                // loadEarlier
    
                // listViewProps={{
                //     inverted: false,
                //     onEndReached: fetchMoreChatMessages,
                //     onEndReachedThreshold: 0.4,
                // }}
                renderUsernameOnMessage={true}
                    {...{ messages: chatMessages, onSend: this.onMessageSent }}
                    user={{
                    _id: userId.toLowerCase(),
                    }}
                alwaysShowSend
                renderSend={this.renderSend}
                renderBubble={this.renderBubble}
                renderMessageText={this.renderMessageText}
                renderTime={this.renderTime}
                renderActions={this.renderActions}
                onPressActionButton={this.pickAttachment}
                infiniteScroll={true}
                onLoadEarlier={fetchMoreChatMessages}
                isLoadingEarlier={loadingMore}
                renderMessage={this.renderMessage}
                onLongPress={this.onLongPressMessage}
                // renderInputToolBar={this.renderInputToolBar}
                
                renderInputToolbar={(props)=> this.renderInputToolBar(props)}
                // bottomOffset={50}
                minInputToolbarHeight={60}
                />
                { openAttachmentList && fileList.length > 0 ? <AttachedFilePreview fileList={fileList}
                 pickAttachment={this.pickAttachment}
                 removeAttachment={removeAttachment}
                 hideAttachmentList = {this.hideAttachmentList}
                 sendOnlyAttachments={sendOnlyAttachments}/> : <View/>} 
                 {sizeExceded && 
                 <Text style={{color:'white',backgroundColor:'red',textAlign:'center'}}>Can't upload more than 20 MB.</Text>
                }
                {filesLengthExceeded
                 && 
                <Text style={{color:'white',backgroundColor:'red',textAlign:'center'}} >Can't upload more than 5 files.</Text>}
                 </View>
            )}
            </KeyboardShift>
                
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: width / 1.5,
    height: 150,
    margin: 13,
    borderRadius: 13,
  },
});

export default Conversation;
