import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Modals.css';
import VoteSuccessModal from './VoteSuccessModal';
import PollDetailModal from './PollDetailModal';
import PollVotingModal from './PollVotingModal';
import CreatePollModal from './CreatePollModal';

class ModalManager extends Component {
  render() {
    return (
      <div>
        <CreatePollModal
          showCreatePollModal={this.props.showCreatePollModal}
          createNewOption={this.props.createNewOption}
          onCreatePoll={this.props.onCreatePoll}
          close={this.props.close}
        />
        <PollVotingModal
          showPollVotingModal={this.props.showPollVotingModal}
          incrementVote={this.props.incrementVote}
          decrementVote={this.props.decrementVote}
          handleVoteSubmit={this.props.handleVoteSubmit}
          updateFBOption={this.props.updateFBOption}
          poll={this.props.poll}
          options={this.props.options}
          close={this.props.close}
        />
        <PollDetailModal
          showPollDetailModal={this.props.showPollDetailModal}
          poll={this.props.poll}
          options={this.props.options}
          close={this.props.close}
          updateOption={this.props.updateOption}
          updateFBOption={this.props.updateFBOption}
        />
        <VoteSuccessModal
          showVoteSuccessModal={this.props.showVoteSuccessModal}
          handleVoteSuccess={this.props.handleVoteSuccess}
          close={this.props.close}
        />
      </div>
    );
  }
}

ModalManager.propTypes = {
  showCreatePollModal: PropTypes.bool.isRequired,
  showVoteSuccessModal: PropTypes.bool.isRequired,
  showPollDetailModal: PropTypes.bool.isRequired,
  showPollVotingModal: PropTypes.bool.isRequired,
  createNewOption: PropTypes.func.isRequired,
  onCreatePoll: PropTypes.func.isRequired,
  handleVoteSubmit: PropTypes.func.isRequired,
  updateOption: PropTypes.func.isRequired,
  updateFBOption: PropTypes.func.isRequired,
  incrementVote: PropTypes.func.isRequired,
  decrementVote: PropTypes.func.isRequired,
  handleVoteSuccess: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default ModalManager;
