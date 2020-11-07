import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Badge } from 'native-base';
import { getTitle, getFirstParticipantName } from './utils';
import TextAvatar from 'react-native-text-avatar';
import chatStyles from './chatStyles';
import moment from 'moment-timezone';
import _ from 'lodash';

const ChatItem = (props) => {
    const { chat, timeZone, setSelectedChatAndNavigate } = props;
    return(
             <TouchableOpacity onPress = {() => setSelectedChatAndNavigate(chat.id)}>
                <View style = {chatStyles.chatItemView}>
                    <View style = {chatStyles.avatrStyle}>
                        <TextAvatar
                            backgroundColor={'#e8e8e8'}
                            textColor={'#1890ff'}
                            size={55}
                            type={'circle'}
                            >{getFirstParticipantName(chat.ezProChatParticipants)}
                        </TextAvatar>
                    </View>
                    <View style = {chatStyles.chatItemStyle}>
                        <View style = {chatStyles.chatTitleStyle}>
                            <View style = {!_.isEmpty(chat.recentMessage) ? chatStyles.titleStyle : {}}>
                                <Text numberOfLines = {1} style = {chat.unRead ? chatStyles.unReadTextStyle : {}}>{getTitle(chat.ezProChatParticipants, true)}</Text>
                            </View>
                            {
                                !_.isEmpty(chat.recentMessage) &&
                                <View style = {chatStyles.recentMsgDateStyle}>
                                    <Text style = {chatStyles.dateStyle}>{moment(chat.recentMessage.messageDate).tz(timeZone).format('DD-MMM-YYYY')}</Text>
                                </View>
                            }
                            
                            
                        </View>
                        {
                            !_.isEmpty(chat.recentMessage) && 
                            <View style = {chatStyles.recentMsgStyle}>
                                <View style = {chat.unRead ? chatStyles.unReadMsgStyle : chatStyles.readMsgStyle}>
                                    <Text numberOfLines = {1} style = {chat.unRead ? chatStyles.unReadTextStyle : {}}>
                                        {_.isEqual('TEXT', chat.recentMessage.type ) ? chat.recentMessage.message : chat.recentMessage.fileName}
                                    </Text>
                                </View>
                                {
                                    !_.isEqual(chat.unRead, 0) &&
                                    <View>
                                    <Badge>
                                        <Text>{chat.unRead}</Text>
                                    </Badge>
                                </View>
                                }
                                
                            </View>
                        }
                        
                        
                    </View>
                </View>
             </TouchableOpacity>
    )
}

export default ChatItem;