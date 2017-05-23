import React, { Component } from 'react';
import './App.css';
import PollList from './components/PollListComponent';
import ModalManager from './components/ModalManagerComponent';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      polls: [],
      poll: {},
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

    const provider = new firebase.auth.GithubAuthProvider();
    const auth = firebase.auth();

    auth.signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        this.setState({
          user: user
        })
        // uid: LDtTRLnXwcPJjMQdte9kttahP8h2
        console.log(result);
      })
      .catch(err => {
        alert(err.message);
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('AuthUser', user, this.logout.className);
      } else {
        console.log('not logged in');
        this.logout.className = 'hide';
      }
    });

  }

  createNewPoll (poll) {
    // Get a key for a new Poll.
    const pollKey = firebase.database().ref().child('polls').push().key;

    // Write the new poll's data simultaneously in the polls list and the user's poll list.
    var updates = {};

    updates['/polls/' + pollKey] = poll;

    updates['/users/' + this.state.user.uid + '/polls/' + pollKey] = poll;
    // updates['/users/' + this.state.user.uid + '/polls'] = ;

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

  handleSubmit (poll) {
    this.setState({
      poll
    });

    // Update to Firebase
  }

  handleLogout (e) {
    firebase.auth().signOut();
  }

  deletePoll () {
    // var newPollKey = firebase.database().ref().child('poll').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    // updates['/poll/'] = null;
    updates['/poll/' + this.state.user.uid + '/'] = null;

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
        <PollList
          polls={this.state.polls}
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
          handleSubmit={this.handleSubmit.bind(this)}
          close={this.close.bind(this)}
          poll={this.state.poll}
          onCreatePoll={this.createPoll.bind(this)}
        />
      </div>
    );
  }
}

export default App;
