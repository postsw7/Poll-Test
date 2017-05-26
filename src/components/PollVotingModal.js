import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { Modal, FormGroup, Checkbox, Button } from 'react-bootstrap';

class PollVotingModal extends Component {
  handleVoteSubmit (e) {
    e.preventDefault();
    console.log(this.props.poll, '투표!!');
    this.props.close("voting");
    this.props.handleVoteSubmit(this.props.poll);
    this.props.updateFBOption();
  }

  handleVoting (idx, e) {
    console.log(this.props.poll, '뭐냐');
    const value = e.target.value;
    const isChecked = e.target.checked;
    for (let key in this.props.options.byId) {
      if (this.props.options.byId[key].text === value) {
        isChecked ? this.props.incrementVote(key) : this.props.decrementVote(key);
      }
    }
  }

  close (key) {
    this.props.close(key);
  }

  render () {
    return (
      <Modal show={this.props.showPollVotingModal} onHide={this.close.bind(this, "voting")}>
        <Modal.Header closeButton>
          <Modal.Title>Poll Voting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{this.props.poll ? this.props.poll.title : null}</h3>
          <h5>Created by <b>{this.props.poll ? this.props.poll.username : null}</b></h5>
          <p>{this.props.poll ? Datetime.moment(this.props.poll.startDate).format('llll') : null} 부터</p>
          <p>{this.props.poll ? Datetime.moment(this.props.poll.expirationDate).format('llll') : null} 까지</p>
          <hr />
          <form onSubmit={this.handleVoteSubmit.bind(this)}>
            <FormGroup>
            {this.props.poll && this.props.poll.options && this.props.poll.options.map((optionId, i) => {
              return (this.props.options.byId[optionId] ?
                <Checkbox onChange={this.handleVoting.bind(this, i)} value={this.props.options.byId[optionId].text} key={i} >{this.props.options.byId[optionId].text}</Checkbox>
                : '');
            })}
            </FormGroup>
            <Button type="submit">Vote</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this, "voting")}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PollVotingModal.propTypes = {
  showPollVotingModal: PropTypes.bool.isRequired,
  handleVoteSubmit: PropTypes.func.isRequired,
  updateFBOption: PropTypes.func.isRequired,
  incrementVote: PropTypes.func.isRequired,
  decrementVote: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};

export default PollVotingModal;
