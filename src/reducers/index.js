import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  polls: {
    byId: {},
    allIds: []
  },
  users: {
    byId: {},
    allIds: []
  },
  options: {
    byId: {},
    allIds: []
  }
}

const polls = (state = initialState.polls, action) => {
  switch (action.type) {
    case types.CREATE_POLL:
      const prevCreatePoll = Object.assign({}, state);
      prevCreatePoll.byId[action.data.id] = {
        title: action.data.title,
        username: action.data.username,
        expirationDate: action.data.expirationDate,
        options: action.data.options
      };
      prevCreatePoll.allIds.push(action.data.id);
      return Object.assign({}, state, prevCreatePoll);
    case types.UPDATE_POLL:
      const prevUpdatePoll = Object.assign({}, state);
      prevUpdatePoll.byId[action.data.id] = {
        title: action.data.title,
        username: action.data.username,
        expirationDate: action.data.expirationDate,
        options: action.data.options
      };
      if (!prevUpdatePoll.allIds.includes(action.data.id)) {
        prevUpdatePoll.allIds.push(action.data.id);
      }
      return Object.assign({}, state, prevUpdatePoll);
    case types.DELETE_POLL:
      const prevDeletePoll = Object.assign({}, state);
      delete prevDeletePoll.byId[action.data.id];
      prevDeletePoll.allIds = prevDeletePoll.allIds.filter(id => {
        return (id !== action.data.id);
      });
      return Object.assign({}, state, prevDeletePoll);
    default:
      return Object.assign({}, state);
  }
}

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      const prevLoginUser = Object.assign({}, state);
      prevLoginUser.byId[action.data.id] = {
        username: action.data.username,
        pollIds: []
      }
      prevLoginUser.allIds.push(action.data.id);
      return Object.assign({}, state, prevLoginUser);
    case types.LOGOUT_USER:
      const prevLogoutUser = Object.assign({}, state);
      delete prevLogoutUser.byId[action.data.id];
      prevLogoutUser.allIds = prevLogoutUser.allIds.filter(id => {
        return (id !== action.data.id);
      });
      return Object.assign({}, state, prevLogoutUser);
    case types.ADD_USER_POLLID:
      const prevUser = Object.assign({}, state);
      if (!prevUser.byId[action.data.uid].pollIds.includes(action.data.pollId)) {
        prevUser.byId[action.data.uid].pollIds.push(action.data.pollId);
      }
      return Object.assign({}, state, prevUser);
    default:
      return Object.assign({}, state);
  }
}

const options = (state = initialState.options, action) => {
  switch (action.type) {
    case types.CREATE_OPTION:
      const prevCreateOptions = Object.assign({}, state);
      prevCreateOptions.byId[action.data.id] = {
        text: action.data.text,
        count: 0
      };
      prevCreateOptions.allIds.push(action.data.id);
      return Object.assign({}, state, prevCreateOptions);
      // TODO: not using it
    case types.UPDATE_OPTION:
      const prevUpdateOptions = Object.assign({}, state);
      prevUpdateOptions.byId[action.data.id] = {
        text: action.data.text,
        count: action.data.count
      };
      if (!prevUpdateOptions.allIds.includes(action.data.id)) {
        prevUpdateOptions.allIds.push(action.data.id);
      }
      return Object.assign({}, state, prevUpdateOptions);
    case types.DELETE_OPTION:
      const prevDeleteOptions = Object.assign({}, state);
      delete prevDeleteOptions.byId[action.data.id];
      prevDeleteOptions.allIds = prevDeleteOptions.allIds.filter(id => {
        return (id !== action.data.id);
      });
      return Object.assign({}, state, prevDeleteOptions);
    case types.INCREMENT_VOTE:
      const prevIncrementOptions = Object.assign({}, state);
      prevIncrementOptions.byId[action.data.optionId].count++;
      return Object.assign({}, state, prevIncrementOptions);
    case types.DECREMENT_VOTE:
      const prevDecrementOptions = Object.assign({}, state);
      prevDecrementOptions.byId[action.data.optionId].count--;
      return Object.assign({}, state, prevDecrementOptions);
    default:
      return Object.assign({}, state);
  }
}

export default combineReducers({
  polls,
  users,
  options
})
