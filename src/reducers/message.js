import { SET_MESSAGES, SET_LAST_MESSAGES } from '../actions/types';

const initialState = {
  messages: [],
  loading: true,
};

function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGES:
      return {
      	messages: payload,
      	loading: false
      };
    case SET_LAST_MESSAGES:
      if(state.messages.length === 0)
        return {
          messages: [...state.messages, payload],
          loading: false
        };
      if(payload._id !== state.messages[state.messages.length - 1]._id)
        return {
          messages: [...state.messages, payload],
          loading: false
        };
    default:
      return state;
  }
}

export default messageReducer;
