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
      console.log('value!!', snap.val());
      this.setState({
        polls: this.state.polls.concat(snap.val()),
        votingPeriod: snap.val().votingPeriod
      })
    })

    pollRef.on('child_changed', snap => {
      this.setState({
        polls: this.state.polls.concat(snap.val())
      })
    })

    pollRef.on('child_removed', snap => {
      const removeIdx = this.state.polls.indexOf(snap.val());
      this.setState({
        polls: [].concat(
          this.state.polls.slice(0, removeIdx),
          this.state.polls.slice(removeIdx+1)
        )
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
    updates['/poll/' + newPollKey] = pollData;
    updates['/user/' + uid + '/' + newPollKey] = pollData;

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

    this.createNewPoll(0, this.state.username, this.state.title, pollOptions, this.state.votingPeriod);
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
    this.setState({
      options: this.state.options[this.state.optionVoted]++,
      showDetailModal: false,
      showResultModal: true
    })
  }

  deletePoll () {

    // var newPollKey = firebase.database().ref().child('poll').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/poll/'] = null;
    updates['/user/' + 0 + '/'] = null;

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
