import React, { Component } from 'react';
import './App.css';
import PollList from './components/PollListComponent';
import { Modal, Button, FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';
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

  open () {
    this.setState({
      showModal: true
    })
  }

  close () {
    this.setState({
      showModal: false
    })
  }

  handleOptions () {
    const pollOptions = {}
    pollOptions[this.opOne.value] = 0;
    pollOptions[this.opTwo.value] = 0;
    pollOptions[this.opThree.value] = 0;

    this.createNewPoll(0, this.state.username, this.state.title, pollOptions);
    this.close();
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
    const pollModal = (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header>
          <Modal.Title>Create Poll</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="option-group" >
          <FormGroup controlId="poll_title">
            <ControlLabel>Set your poll title</ControlLabel>
            <FormControl onChange={(e) => { this.setState({ title: e.target.value }); }} type="text" placeholder="type your poll title"/>
          </FormGroup>
          <FormGroup controlId="username">
            <ControlLabel>Name</ControlLabel>
            <FormControl onChange={(e) => { this.setState({ username: e.target.value }); }} type="text" placeholder="type your name"/>
          </FormGroup>
          <FormGroup controlId="option_1">
            <InputGroup>
              <InputGroup.Addon>
                <input type="radio" aria-label="..." />
              </InputGroup.Addon>
              <FormControl inputRef={ref => { this.opOne = ref; }} type="text" placeholder="type your option" />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="option_2">
            <InputGroup>
              <InputGroup.Addon>
                <input type="radio" aria-label="..." />
              </InputGroup.Addon>
              <FormControl inputRef={ref => { this.opTwo = ref; }} type="text" placeholder="type your option" />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="option_3">
            <InputGroup>
              <InputGroup.Addon>
                <input type="radio" aria-label="..." />
              </InputGroup.Addon>
              <FormControl inputRef={ref => { this.opThree = ref; }} type="text" placeholder="type your option" />
            </InputGroup>
          </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleOptions.bind(this)}>Create Poll</Button>
        </Modal.Footer>

      </Modal>
    );

    return (
      <div className="App">
        <PollList />
        <Button bsStyle="primary" onClick={this.open.bind(this)}>Create Poll</Button>
        <Button onClick={this.deletePoll.bind(this)}>Delete Poll</Button>
        {pollModal}
      </div>
    );
  }
}

export default App;
