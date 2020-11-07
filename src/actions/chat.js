import createActionType from '../utils/action';
import { create } from 'lodash';
import api from '../utils/api';

export const UPDATE_SELECTEDCHAT = createActionType('UPDATE_SELECTEDCHAT');
export const ADD_MESSAGE = createActionType('ADD_MESSAGE');
export const DELETE_MESSAGE = createActionType('DELETE_MESSAGE');
export const CLEAR_MESSAGES = createActionType('CLEAR_MESSAGES');
export const REMOVE_MESSAGES_TO_DELETE = createActionType('REMOVE_MESSAGES_TO_DELETE');
export const ADD_MESSAGE_TO_DELETE = createActionType('ADD_MESSAGE_TO_DELETE');
export const SET_UNREAD_CHATS = createActionType('SET_UNREAD_CHATS');
export const REDUCE_UNREAD_CHATS_BY_1 = createActionType('REDUCE_UNREAD_CHATS_BY_1');
export const CLEAR_SELECTED_CHAT = createActionType('CLEAR_SELECTED_CHAT');
export const CLEAR_UNREAD_COUNT = createActionType('CLEAR_UNREAD_COUNT');

const updateSelectedChat = (selectedChat) => ({
    type: UPDATE_SELECTEDCHAT,
    selectedChat,
});

const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message,
});

const removeMessage = (messages) => ({
    type: DELETE_MESSAGE,
    messages,
});

const updateUnreadChats = (unreadChats) => ({
    type: SET_UNREAD_CHATS,
    unreadChats,
});

export const removeMessagesToDelete = (messages) => ({
    type: REMOVE_MESSAGES_TO_DELETE,
    messages,
});

export const addMessageToDelete = (message) => ({
    type: ADD_MESSAGE_TO_DELETE,
    message,
})
const unreadChats = (count) => ({
    type: SET_UNREAD_CHATS,
    count,
});

const reduceUnreadChats = (unreadChats) => ({
    type: REDUCE_UNREAD_CHATS_BY_1,
    unreadChats

});

export const setSelectedChat = (selectedChat) => async dispatch => {
    dispatch(updateSelectedChat(selectedChat));
}

export const addMessageToSelectedChat = (message) => dispatch => {
    dispatch(addMessage(message));
}

export const addMessageToDeleteAction = (message) => dispatch => {
    dispatch(addMessageToDelete(message));
}

export const deleteMessage = (messages) => dispatch => {
    dispatch(removeMessage(messages));
}

export const reduceUnReadChatsBy1 = (unreadChats) => dispatch => {
    dispatch(reduceUnreadChats(unreadChats));
}

export const setUnreadChats = (unreadChats) => dispatch => {
    dispatch(updateUnreadChats(unreadChats));
}

export const clearSelectedChatAction = () => ({
    type: CLEAR_SELECTED_CHAT,
})

export const retrieveUnreadChats = (participantPkId) => async dispatch => {
    try {
        const res = await api.get(`ezProChat/unread/${participantPkId}`);
        const unreadChats = {
            unreadChatIds: res.data,
            count: res.data.length
        };
        dispatch(setUnreadChats(unreadChats));
    } catch (error) {
        console.log(error);
    }
}

const clearUnReadCountOfGivenChatId = (canClear) => ({
    type: CLEAR_UNREAD_COUNT,
    canClear,
});

export const clearUnReadCount = (canClear) => dispatch => {
    dispatch(clearUnReadCountOfGivenChatId(canClear))
}