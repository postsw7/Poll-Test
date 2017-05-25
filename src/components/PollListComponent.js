import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/PollList.css';
import { Well, ListGroup } from 'react-bootstrap';
import PollListEntry from './PollListEntryComponent';


class PollListComponent extends Component {
  render() {
    return (
      <div className="pollList">
        <h1>Poll List</h1>
        <Well>
          <ListGroup>
            {!!this.props.polls.allIds.length && this.props.polls.allIds.map((pollId, i) => {
              return (
                <PollListEntry
                  key={i}
                  pollId={pollId}
                  polls={this.props.polls.byId}
                  onVoteBtnClick={this.props.onVoteBtnClick}
                  onPollEntryClick={this.props.onPollEntryClick}
                />
              );
            })}
          </ListGroup>
        </Well>
      </div>
    );
  }
}

PollListComponent.propTypes = {
  polls: PropTypes.object.isRequired,
  onPollEntryClick: PropTypes.func.isRequired,
  onVoteBtnClick: PropTypes.func.isRequired
};

export default PollListComponent;
