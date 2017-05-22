import React, { Component } from 'react';
import './App.css';
import PollList from './components/PollListComponent';
import Modals from './components/ModalsComponent';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      polls: [],
      username: '',
      title: '',
      options: {},
      votingPeriod: null,
      showModal: false,
      showDetailModal: false,
      showResultModal: false,
      showAnotherModal: false,
      optionVoted: null
    }
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
      })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('AuthUser', user, this.logout.className);
      } else {
        console.log('not logged in');
        this.logout.className = 'hide';
      }
    })

    const rootRef = firebase.database().ref();
    // const userRef = rootRef.child('user');
    const pollRef = rootRef.child('poll');

    // userRef.on('value', snap => {
    //   console.log(snap.val())
    //   this.setState({
    //     username: snap.val()
    //   })
    // })
    pollRef.on('child_added', snap => {
      console.log('value!!', snap.key, snap.val());
      const pollList = snap.val();
      for (let key in pollList) {
        this.setState({
          polls: this.state.polls.concat(pollList[key])
          // votingPeriod: snap.val().votingPeriod
      })
      }
    })

    pollRef.on('child_changed', snap => {
      this.setState({
        polls: this.state.polls.concat(snap.val())
      })
    })

    pollRef.on('child_removed', snap => {
      // const removeIdx = this.state.polls.indexOf(snap.val());
      console.log(snap.val(), 'VALUE');
      this.setState({
        polls: []
      })
    })
  }

  createNewPoll (uid, username, title, options, period) {

    var pollData = {
      creator: username,
      uid: uid,
      options: options,
      title: title,
      voteCount: 0,
      votingPeriod: period
    };

    // Get a key for a new Poll.
    var newPollKey = firebase.database().ref().child('poll').push().key;

    // Write the new poll's data simultaneously in the polls list and the user's poll list.
    var updates = {};
    // updates['/poll/' + newPollKey] = pollData;
    updates['/poll/' + uid + '/' + newPollKey] = pollData;

    return firebase.database().ref().update(updates);
  }

  open () {
    this.setState({
      showModal: true
    })
  }

  openAnotherModal () {
    this.setState({
      showAnotherModal: true
    })
  }

  openDetailModal () {
    this.setState({
      showDetailModal: true
    })
  }

  close () {
    this.setState({
      showModal: false,
      showDetailModal: false,
      showResultModal: false,
      showAnotherModal: false
    })
  }

  handleTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  handleUsername (e) {
    this.setState({
      username: e.target.value
    })
  }

  handleOptions (opOne, opTwo, opThree) {
    const pollOptions = {}
    pollOptions[opOne.value] = 0;
    pollOptions[opTwo.value] = 0;
    pollOptions[opThree.value] = 0;

    this.createNewPoll(this.state.user.uid, this.state.username, this.state.title, pollOptions, this.state.votingPeriod);
    this.close();
  }

  handleDate (votingPeriod) {
    this.setState({
      votingPeriod: votingPeriod
    })
  }

  handlePolls (poll) {
    this.setState({
      username: poll.creator,
      title: poll.title,
      options: poll.options,
      votingPeriod: poll.votingPeriod
    })
  }

  handleVoting (e) {
    this.setState({
      optionVoted: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({
      options: this.state.options[this.state.optionVoted]++,
      showDetailModal: false,
      showResultModal: true
    })
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

  render() {
    return (
      <div className="App">
        <PollList
          username={this.state.username}
          polls={this.state.polls}
          votingPeriod={this.state.votingPeriod}
          openAnotherModal={this.openAnotherModal.bind(this)}
          openDetailModal={this.openDetailModal.bind(this)}
          close={this.close.bind(this)}
          handlePolls={this.handlePolls.bind(this)}
        />
        <Button bsStyle="primary" onClick={this.open.bind(this)}>Create Poll</Button>
        <Button onClick={this.deletePoll.bind(this)}>Delete Poll</Button>
        <Button className="logoutBtn" ref={ref => { this.logout = ref; }} onClick={this.handleLogout.bind(this)}>Log out</Button>
        <Modals
          showModal={this.state.showModal}
          showDetailModal={this.state.showDetailModal}
          showResultModal={this.state.showResultModal}
          showAnotherModal={this.state.showAnotherModal}
          close={this.close.bind(this)}
          title={this.state.title}
          username={this.state.username}
          options={this.state.options}
          votingPeriod={this.state.votingPeriod}
          handleTitle={this.handleTitle.bind(this)}
          handleUsername={this.handleUsername.bind(this)}
          handleOptions={this.handleOptions.bind(this)}
          handleDate={this.handleDate.bind(this)}
          handleVoting={this.handleVoting.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default App;
