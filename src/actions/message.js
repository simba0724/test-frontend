import api from '../utils/api';
import { setAlert } from './alert';
import {
  SET_MESSAGES,
  SET_LAST_MESSAGES
} from './types';

export const getGlobalMessages = () => async dispatch => {
  
}

export const sendGlobalMessage = (message) => async dispatch => {
	try {
    const res = await api.post('/message/global', {message});

    dispatch(getGlobalMessages());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const getConversationMessages = (receiveId) => async dispatch => {
	try {
    const res = await api.get('/message/conversation/'+receiveId);
    if(res.status === 200)
	    dispatch({
	      type: SET_MESSAGES,
	      payload: res.data
	    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const sendConversationMessage = (receiveId, message) => async dispatch => {
	try {
    const res = await api.post('/message/conversation', {message, receiveId});

    // dispatch(getConversationMessages(receiveId));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const setLastMessage = (message) => async dispatch => {
	dispatch({
    type: SET_LAST_MESSAGES,
    payload: message
  });
}
