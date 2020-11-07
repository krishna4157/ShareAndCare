import createActionType from '../utils/action';

export const REQUEST = createActionType('REQUEST')
export const SUCCESS = createActionType('SUCCESS')
export const FAILURE = createActionType('FAILURE')

export const request = () => ({
    type: REQUEST,
});

export const failure = () => ({
    type: FAILURE,
});

export const success = () => ({
    type: SUCCESS,
});