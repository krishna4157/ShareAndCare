import createActionType from '../utils/action';

export const MESSAGES_RETRIEVE_REQUEST = createActionType('MESSAGES_RETRIEVE_REQUEST')
export const MESSAGES_RETRIEVE_SUCCESS = createActionType('MESSAGES_RETRIEVE_SUCCESS')
export const MESSAGES_RETRIEVE_FAILURE = createActionType('MESSAGES_RETRIEVE_FAILURE')

export const retrieveMessagesRequest = () => ({
    type: MESSAGES_RETRIEVE_REQUEST,
});

export const retrieveMessagesFailure = (message) => {
    console.log(message)
    return {
    type: MESSAGES_RETRIEVE_FAILURE,
    message: message,
}};

export const retrieveMessagesSuccess = () => ({
    type: MESSAGES_RETRIEVE_SUCCESS,
});

