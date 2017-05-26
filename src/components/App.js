import React, { Component } from 'react';
import '../styles/App.css';
import PollList from './PollList';
import ModalManager from './ModalManager';
import Login from './Login';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      user: null,
      polls: [],
      poll: {},
      options: [],
      showCreatePollModal: false,
      showPollDetailModal: false,
      showVoteSuccessModal: false,
      showPollVotingModal: false,
      optionVoted: null
    };

    this.modalKeyMap = {
      create: "showCreatePollModal",
      voting: "showPollVotingModal",
      detail: "showPollDetailModal",
      success: "showVoteSuccessModal"
    };
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyAjy12DzoLruJbJ9XsvD8L-I-zeX81D5yc",
      authDomain: "classting-5d243.firebaseapp.com",
      databaseURL: "https://classting-5d243.firebaseio.com",
      projectId: "classting-5d243",
      storageBucket: "classting-5d243.appspot.com",
      messagingSenderId: "763590798520"
    };

    firebase.initializeApp(config);

    const rootRef = firebase.database().ref();
    const userRef = rootRef.child('users');
    // const pollRef = rootRef.child('polls');
    const pollRef = firebase.database().ref('polls');
    const optionRef = rootRef.child('options/byId');

    pollRef.on('child_added', snap => {
      console.log('value!!', snap.key, snap.val());
      this.props.updatePoll(snap.key, snap.val().title, snap.val().username, snap.val().startDate, snap.val().expirationDate, snap.val().options);
      if (snap.val().username === this.state.user.username) {
        this.props.addUserPollId(this.state.user.uid, snap.key);
      }
      this.setState({
        polls: this.state.polls.concat(snap.val())
      });
    });

    pollRef.on('child_changed', snap => {
      console.log('CHANGED?', snap.key, snap.val());
      // debugger
      this.props.updatePoll(snap.key, snap.val().title, snap.val().username, snap.val().startDate, snap.val().expirationDate, snap.val().options);
      this.setState({
        polls: this.state.polls.concat(snap.val())
      });
    });

    pollRef.on('child_removed', snap => {
      console.log(snap.val(), 'POLL_REMOVED');
      this.props.removeUserPollId(this.state.user.uid, snap.key);
      // debugger
      // const updates = {};
      // this.props.deletePoll(snap.key);
      // snap.val().options.forEach(optionId => {
      //   this.props.deleteOption(optionId);
      // })
      // updates['/options/byId'] = this.props.options.byId;
      // updates['/options/allIds'] = this.props.options.allIds;
      // return firebase.database().ref().update(updates);
    });

    optionRef.on('child_added', snap => {
      console.log('OPTION_ADDED', snap.key, snap.val());
      this.props.updateOption(snap.key, snap.val().text, snap.val().count);
    })

    optionRef.on('child_changed', snap => {
      console.log('OPTION_Changed', snap.key, snap.val());
    })

    optionRef.on('child_removed', snap => {
      console.log('OPTION_REMOVED', snap.key, snap.val());
      this.props.deleteOption(snap.key);
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('USER LOGGED IN:::', user);
        const username = user.email;
        const uid = user.uid;

        this.setState({
          isLoggedin: true,
          user: { username, uid,
            pollIds: []}
        })
        this.props.logInUser(uid, username);
        for (let key in this.props.polls.byId) {
          if (this.props.polls.byId[key].username === username) {
            this.props.addUserPollId(uid, key);
          }
        }
      } else {
        console.log('USER NOT LOGGED IN');
        this.props.logOutUser(this.state.user.uid);
        this.setState({
          isLoggedin: false,
          user: null
        })
      }
    })
  }

  createNewPoll (poll) {
    // Get a key for a new Poll.
    const pollId = firebase.database().ref().child('polls').push().key;
    // Write the new poll's data simultaneously in the polls list and the user's poll list.
    const uid = this.state.user.uid;
    poll.username = this.state.user.username;
    // debugger
    poll.options = this.state.options;
    this.props.createPoll(pollId, poll.title, poll.username, poll.startDate, poll.expirationDate, poll.options);
    this.props.addUserPollId(uid, pollId);
    const updates = {};
    this.setState({
      options: []
    })
    updates['/polls/' + pollId] = poll;
    // updates['/polls/byId/'] = this.props.polls.byId;
    // updates['/polls/allIds/'] = this.props.polls.allIds;

    // updates['/users/byId/' + this.state.user.uid] = user;
    updates['/users/' + uid + '/pollIds/'] = this.props.users.byId[uid].pollIds;
    updates['/users/' + uid + '/username/'] = this.state.user.username;
    return firebase.database().ref().update(updates);
  }

  createNewOption (text) {
    const optionId = firebase.database().ref().child('options').push().key;
    const uid = this.state.user.uid;
    this.props.createOption(optionId, text);
    this.setState({
      options: this.state.options.concat(optionId)
    });
    const updates = {};
    updates['/options/byId/'] = this.props.options.byId;
    updates['/options/allIds/'] = this.props.options.allIds;
    return firebase.database().ref().update(updates);
  };

  updateFBOption () {
    const updates = {};
    updates['/options/'] = this.props.options;
    return firebase.database().ref().update(updates);
  }

  close (key) {
    this.setState({
      [this.modalKeyMap[key]]: false
    });
  }

  createPoll (poll) {
    this.setState((prevState, props) => {
      prevState.polls.push(poll);
      return {
        polls: prevState.polls,
        showCreatePollModal: false
      };
    });

    this.createNewPoll(poll);
  }

  handleLogin (email, password) {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password)
    promise.catch(e => {
      console.log(e.message);
    })
  }

  handleSignup (email, password) {
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password)
    promise.catch(e => {
      console.log(e.message);
    })
  }

  handleVoteSubmit (poll) {
    console.log(poll,"PIKEEE");
    this.setState({
      showVoteSuccessModal: true,
      poll
    });

    // Update to Firebase
  }

  handleVoteSuccess () {
    console.log(this.state.poll);
    this.setState({
      showVoteSuccessModal: false,
      showPollDetailModal: true
    })
  }

  handleLogout (e) {
    firebase.auth().signOut();
  }

  deletePoll () {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    const uid = this.state.user.uid;

    this.props.polls.allIds.forEach(pollId => {
      if (this.props.users.byId[uid].pollIds.includes(pollId)) {
        this.props.polls.byId[pollId].options.forEach(optionId => {
          this.props.deleteOption(optionId);
        })
        updates['/polls/' + pollId] = null;
        this.props.deletePoll(pollId);
      }
    });
    updates['/options/byId'] = this.props.options.byId;
    updates['/options/allIds'] = this.props.options.allIds;
    updates['/users/' + this.state.user.uid + '/pollIds/'] = null;

    return firebase.database().ref().update(updates);
  }

  openCreatePollModal () {
    this.setState({
      showCreatePollModal: true,
      poll: {}
    });

    // Create in Firebase
  }

  onPollEntryClick (poll) {
    this.setState({
      showPollDetailModal: true,
      poll
    });
  }

  onVoteBtnClick (poll) {
    this.setState({
      showPollVotingModal: true,
      poll
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.isLoggedin ?
        <Login
          handleLogin={this.handleLogin.bind(this)}
          handleSignup={this.handleSignup.bind(this)}
        /> :
        <div>
        <PollList
          polls={this.props.polls}
          onVoteBtnClick={this.onVoteBtnClick.bind(this)}
          onPollEntryClick={this.onPollEntryClick.bind(this)}
        />
        <Button bsStyle="primary" onClick={this.openCreatePollModal.bind(this)}>Create Poll</Button>
        <Button onClick={this.deletePoll.bind(this)}>Delete Poll</Button>
        <Button className="logoutBtn" ref={ref => { this.logout = ref; }} onClick={this.handleLogout.bind(this)}>Log out</Button>
        <ModalManager
          showCreatePollModal={this.state.showCreatePollModal}
          showPollDetailModal={this.state.showPollDetailModal}
          showVoteSuccessModal={this.state.showVoteSuccessModal}
          showPollVotingModal={this.state.showPollVotingModal}
          onCreatePoll={this.createPoll.bind(this)}
          createNewOption={this.createNewOption.bind(this)}
          incrementVote={this.props.incrementVote}
          decrementVote={this.props.decrementVote}
          updateFBOption={this.updateFBOption.bind(this)}
          handleVoteSubmit={this.handleVoteSubmit.bind(this)}
          handleVoteSuccess={this.handleVoteSuccess.bind(this)}
          close={this.close.bind(this)}
          poll={this.state.poll}
          options={this.props.options}
          updateOption={this.props.updateOption}
        />
        </div>
      }
      </div>
    );
  }
}

export default App;
