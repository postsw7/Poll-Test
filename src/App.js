import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      username: 'undefined',
      vote: null,
      title: 'Poll Title',
      options: [],
      showModal: false
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
      console.log(snap.val());
      this.setState({
        polls: this.state.polls.concat(snap.val())
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

  createNewPoll (uid, username, title, options) {

    var pollData = {
      creator: username,
      uid: uid,
      options: options,
      title: title,
      voteCount: 0
    };

    // Get a key for a new Poll.
    var newPollKey = firebase.database().ref().child('poll').push().key;

    // Write the new poll's data simultaneously in the polls list and the user's poll list.
    var updates = {};
    updates['/poll/' + newPollKey] = pollData;
    updates['/user/' + uid + '/' + newPollKey] = pollData;

    return firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div className="App">
        <Button bsStyle="primary">Create Poll</Button>
        <Button>Delete Poll</Button>
      </div>
    );
  }
}

export default App;
