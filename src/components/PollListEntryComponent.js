import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/PollListEntry.css';
import Datetime from 'react-datetime';
import { ListGroupItem, Button, Label } from 'react-bootstrap';

class PollListEntryComponent extends Component {
  onVoteBtnClick (e) {
    e.stopPropagation();
    const pollId = this.props.pollId;
    this.props.onVoteBtnClick(this.props.polls[pollId]);
  }

  onPollEntryClick (e) {
    const pollId = this.props.pollId;
    this.props.onPollEntryClick(this.props.polls[pollId]);
  }

  render() {
    const pollId = this.props.pollId;
    return (
      <div>
        <ListGroupItem header={this.props.polls[pollId].title} onClick={this.onPollEntryClick.bind(this)}>
          Created by {this.props.polls[pollId].username}
        <br/>
        <b>{this.props.polls[pollId].expirationDate}</b>
        {(Date.parse(this.props.polls[pollId].expirationDate) > Date.parse(Datetime.moment().format())) ?
          <span className="votingBtn">
          <Button onClick={this.onVoteBtnClick.bind(this)} bsSize="xs">투표하기</Button>
          {' '}
          <Label bsStyle="info">진행중</Label>
          </span>
          :
          <span className="votingBtn">
          <Button disabled bsSize="xs">투표하기</Button>
          {' '}
          <Label>투표마감</Label>
          </span>
        }
        </ListGroupItem>
      </div>
    );
  }
}

PollListEntryComponent.propTypes = {
  polls: PropTypes.object.isRequired,
  pollId: PropTypes.string.isRequired,
  onVoteBtnClick: PropTypes.func.isRequired,
  onPollEntryClick: PropTypes.func.isRequired
};

export default PollListEntryComponent;
