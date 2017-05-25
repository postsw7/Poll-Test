import * as types from './actionTypes';

export const createPoll = (id, title, username, expirationDate, options) => ({
  type: types.CREATE_POLL,
  data: {
    id,
    title,
    username,
    expirationDate,
    options
  }
});

export const updatePoll = (id, title, username, expirationDate, options) => {
  return {
    type: types.UPDATE_POLL,
    data: {
      id,
      title,
      username,
      expirationDate,
      options
    }
  }
};

export const deletePoll = (id) => ({
  type: types.DELETE_POLL,
  data: {
    id
  }
});

export const incrementVote = (optionId) => ({
  type: types.INCREMENT_VOTE,
  data: {
    optionId
  }
});

export const decrementVote = (optionId) => ({
  type: types.DECREMENT_VOTE,
  data: {
    optionId
  }
});

export const createOption = (id, text) => {
  return {
    type: types.CREATE_OPTION,
    data: {
      id,
      text
    }
  }
};

export const updateOption = (id, text, count) => ({
  type: types.UPDATE_OPTION,
  data: {
    id,
    text,
    count
  }
});

export const deleteOption = (id) => ({
  type: types.DELETE_OPTION,
  data: {
    id
  }
});

export const logInUser = (id, username) => ({
  type: types.LOGIN_USER,
  data: {
    id,
    username
  }
});

export const logOutUser = (id) => ({
  type: types.LOGOUT_USER,
  data: {
    id
  }
});

export const addUserPollId = (uid, pollId) => ({
  type: types.ADD_USER_POLLID,
  data: {
    uid,
    pollId
  }
});

