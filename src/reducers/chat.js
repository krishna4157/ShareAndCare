import {
    UPDATE_SELECTEDCHAT,
    ADD_MESSAGE,
    DELETE_MESSAGE,
    REDUCE_UNREAD_CHATS_BY_1,
    SET_UNREAD_CHATS,
    ADD_MESSAGE_TO_DELETE,
    REMOVE_MESSAGES_TO_DELETE,
    CLEAR_SELECTED_CHAT,
    CLEAR_UNREAD_COUNT
  } from '../actions/chat';
  import initialState from '../store/initialState';
  import _ from 'lodash';
import { Actions } from 'react-native-gifted-chat';
  
  export default (state = initialState.chat, action) => {
    switch (action.type) {
      case UPDATE_SELECTEDCHAT:
        return {
          ...state,
          recentUnReadMessages: _.isEqual(_.toUpper(state.selectedChat.id), _.toUpper(action.selectedChat.id)) ? state.recentUnReadMessages : [],
          selectedChat: action.selectedChat,
        };
      case ADD_MESSAGE:
        return {
          ...state,
          recentUnReadMessages: [...state.recentUnReadMessages, action.message],
        };
      case DELETE_MESSAGE:{
        _.remove(state.recentUnReadMessages, msg => (_.filter(action.messages, md => _.isEqual(_.toUpper(msg.id), _.toUpper(md.id)))).length);
        return {
          ...state,
        };
      };
      case SET_UNREAD_CHATS:
        return {
          ...state,
          unreadChats: {
            ...action.unreadChats
          },
        };
      case REDUCE_UNREAD_CHATS_BY_1:
        return {
          ...state,
          unreadChats: {
            ...action.unreadChats,
          }
        };
      case ADD_MESSAGE_TO_DELETE:{
        return {
          ...state,
          messagesToDelete: [...state.messagesToDelete, action.message],
        };
      };
      case REMOVE_MESSAGES_TO_DELETE:{
        _.remove(state.messagesToDelete, msg => (_.filter(action.messages, md => _.isEqual(_.toUpper(msg.id), _.toUpper(md.id)))).length);
        return {
          ...state,
        };
      };
      case CLEAR_SELECTED_CHAT:{
        return {
          ...state,
          selectedChat: {}
        };
      };
      case CLEAR_UNREAD_COUNT: {
        return {
          ...state,
          canClearUnreadCountOfSelectedChat: action.canClear,
        }
      }
      default:
        return state;
    }
  };
  