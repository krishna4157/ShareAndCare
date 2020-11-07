import _ from 'lodash';
import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export

export const getSubjectNameAndNo = (p) => (p.fullName ? `${p.subjectNo}(${p.fullName})` : p.subjectNo);

export const getTitle = (participants, showFullName) => {
  const activeParticipants = _.filter(participants, p => p.isActive);
  const names = _.map(activeParticipants, p => (_.isEqual(p.type, 'SITE_STAFF') ? p.participant.fullName : getSubjectNameAndNo(p.participant)));
  if (showFullName || names.length <= 2) {
    return _.join(names, ',');
  }
  const loNames = [names[0], names[1]];
  return `${_.join(loNames, ',')}, ${names.length - loNames.length} others`;
};

export const getParticipantName = (msg, chatParticipants) => {
  const cp = _.find(chatParticipants, p => _.isEqual(_.toUpper(msg.participantPkId), _.toUpper(p.participantPkId)));
  if (cp) {
    return _.isEqual(cp.type, 'SITE_STAFF') ? cp.participant.fullName : getSubjectNameAndNo(cp.participant);
  }
  return null;
};

export const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const isSubjectAdded = (chatParticipants) => {
  const subjects = _.filter(chatParticipants, cp => _.isEqual('SUBJECT', cp.type));
  return !_.isEmpty(subjects);
}

export const getFirstParticipantName = (participants) => {
  const activeParticipants = _.filter(participants, p => p.isActive);
  if(!_.isEmpty(activeParticipants)){
    return activeParticipants[0].participant.fullName;
  }
    return null;
}

export const addParticipant = (props) => {
  const {
    message, chats, userId, selectedChatId,
  } = props;
  const chat = _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(message.chatId)));
  if (!_.isEmpty(chat)) {
    chat.ezProChatParticipants = message.ezProChat.ezProChatParticipants;
    // if (!_.is(userId, chat.ezProChatParticipants)) {
    // const index = _.findIndex(chat.ezProChatParticipants, p => _.isEqual(_.toUpper(p.participantPkId), _.toUpper(message.ezProChatParticipant.participantPkId)));
    // if (index >= 0) {
    //   chat.ezProChatParticipants[index] = message.ezProChatParticipant;
    // } else {
    //   const participants = _.concat(chat.ezProChatParticipants, message.ezProChatParticipant);
    //   chat.ezProChatParticipants = participants;
    // }
    // }
    return {
      chats,
      selectedChat: _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(selectedChatId))),
    };
  }
  const loChat = message.ezProChat || message.ezProChatParticipant.ezProChat;
  const loChats = _.concat([loChat], chats);
  // const participants = [{ ...message.ezProChatParticipant }];
  // loChat.ezProChatParticipants = participants;
  return {
    chats: loChats,
    selectedChat: _.isEqual(_.toUpper(userId), _.toUpper(loChat.createdById)) ? loChat : _.find(chats, ch => _.isEqual(ch.id, selectedChatId)),
  };
};



const getUnReadCount = (updatedChat, selectedChatId, userId, message) => {
  if (_.isEqual(_.toUpper(userId), _.toUpper(message.ezProChatMessage.participantPkId))
  || _.isEqual(_.toUpper(message.chatId), _.toUpper(selectedChatId))) {
    return updatedChat.unRead;
  }
  return updatedChat.unRead + 1;
};

export const addMessage = (props) => {
const {
  message, selectedChatId, chats,userId } = props;
const updatedChat = _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(message.chatId)));
updatedChat.recentMessage = message.ezProChatMessage;
updatedChat.unRead = getUnReadCount(updatedChat, selectedChatId, userId, message);
return {
  chats,
ezProChatMessage: message.ezProChatMessage,
};
};

export const removeMessage = (props) => {
  const {
    message, selectedChatId, chats,userId } = props;
  const updatedChat = _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(message.chatId)));
  if(updatedChat){
    if (updatedChat.recentMessage && _.isEqual(_.toUpper(updatedChat.recentMessage.id), _.toUpper(message.ezProChatMessage.id))) {
      updatedChat.recentMessage = _.get(message.ezProChatMessage, 'ezProChat.recentMessage');
    } 
    // updatedChat.recentMessage = message.ezProChatMessage.ezProChat?.recentMessage;
    // updatedChat.unRead = updatedChat.unRead > 0 ? updatedChat.unRead - 1 : updatedChat.unRead ;
    const participant = _.find(updatedChat.ezProChatParticipants, p => _.isEqual(_.toUpper(p.participantPkId), _.toUpper(userId)));
    if (!_.isEmpty(participant)) {
      if (moment(participant.lastSeenDate) < moment(_.get(message.ezProChatMessage, 'messageDate'))) {
        updatedChat.unRead = updatedChat.unRead > 0 ? updatedChat.unRead - 1 : updatedChat.unRead;
      }
    }
  }
  return {
    chats,
  ezProChatMessage: message.ezProChatMessage,
  };
};

export const removeParticipant = (props) => {
const {
  message, chats, userId, selectedChatId,
} = props;
const chat = _.find(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(message.chatId)));
if (!_.isEmpty(chat)) {
  const index = _.findIndex(chat.ezProChatParticipants, p => _.isEqual(_.toUpper(p.participantPkId), _.toUpper(message.ezProChatParticipant.participantPkId)));
  chat.ezProChatParticipants[index] = message.ezProChatParticipant;
  // _.remove(chat.ezProChatParticipants, cp => _.isEqual(cp.id, message.ezProChatParticipant.id));
  if ( _.isEqual(_.toUpper(userId), _.toUpper(message.ezProChatParticipant.participantPkId))) {
    _.remove(chats, ch => _.isEqual(_.toUpper(ch.id), _.toUpper(message.chatId)));
  }
}
return {
  chats,
  participant: message.ezProChatParticipant,
};
};
