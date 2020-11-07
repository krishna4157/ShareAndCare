import _ from 'lodash';
import moment from 'moment-timezone';

const getParticipantName = (ezProChatParticipants, participantPkId) => {
   const participant =  _.find(ezProChatParticipants, cp => cp.participant.id === participantPkId);
   return participant ? participant.participant.fullName : ''; 
}

export const buildChatMessages = (chatMessages, selectedChat, timeZone) => {
    // const momTzDateTime = moment(chatMessages[0].messageDate).tz(timeZone).format("DD-MMM-YYYY HH:mm");
//     const utcToSubjectTz =  moment.tz(momTzDateTime, timeZone).format("DD-MMM-YYYY HH:mm");
    // console.log(momTzDateTime);
    return chatMessages.map(cm => {
        return {
            _id: cm.id,
            text: cm.type === 'FILE' ? ' ' : cm.message,
            createdAt: moment(`${cm.messageDate}`).tz(timeZone).format("DD-MMM-YYYY HH:mm"),
            user: {
                _id: cm.participantPkId.toLowerCase(),
                name: getParticipantName(selectedChat.ezProChatParticipants, cm.participantPkId),
            },
            fileName: cm.fileName,
            url: cm.url,
            messageType: cm.type
        }
    })
}

export const getFileType = (fileName) => {
    const fileNameArray = _.split(fileName, '.');
    const fileExt = _.last(fileNameArray);
    return fileExt ? `file/${fileExt}` : 'file/txt'
}

export const sortInReverseOrder = (chatMessages) => {
    const loChatMessages = [...chatMessages]
    _.reverse(loChatMessages);
    return loChatMessages
}