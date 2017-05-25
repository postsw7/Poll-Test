import App from '../components/App';
import * as actions from '../actions/actionCreators';
import { connect} from 'react-redux';

const mapStateToProps = (state) => ({
    polls: state.polls,
    users: state.users,
    options: state.options
})

const mapDispatchToProps = (dispatch) => ({
    createPoll: (id, title, username, expirationDate, options) => { dispatch(actions.createPoll(id, title, username, expirationDate, options)); },
    updatePoll: (id, title, username, expirationDate, options) => { dispatch(actions.updatePoll(id, title, username, expirationDate, options)); },
    deletePoll: (id) => { dispatch(actions.deletePoll(id)); },
    incrementVote: (id) => { dispatch(actions.incrementVote(id)); },
    decrementVote: (id) => { dispatch(actions.decrementVote(id)); },
    createOption: (id, text) => { dispatch(actions.createOption(id, text)); },
    updateOption: (id, text, count) => { dispatch(actions.updateOption(id, text, count)); },
    deleteOption: (id) => { dispatch(actions.deleteOption(id)); },
    logInUser: (id, username) => { dispatch(actions.logInUser(id, username)); },
    logOutUser: (id) => { dispatch(actions.logOutUser(id)); },
    addUserPollId: (uid, pollId) => { dispatch(actions.addUserPollId(uid, pollId)); }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
