import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Modal, Button, FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Datetime from 'react-datetime';

class CreatePollModal extends Component {
  constructor(props) {
    super(props);

    this.validDate = ( idx, current ) => {
      if (!idx) {
        const startValidDate = Datetime.moment().subtract( 1, "day" );
        return current.isAfter( startValidDate );
      } else {
        const endValidDate = Datetime.moment(this.state.poll.startDate).subtract(1, "day");
        return current.isAfter( endValidDate );
      }
    };

    this.state = {
      poll: {}
    };
  }

  close (key) {
    this.props.close(key);
  }

  updateTitle (e) {
    const value = e.target.value;

    this.setState((prevState, props) => {
      let poll = prevState.poll;
      poll.title = value;
      return { poll: Object.assign({}, poll) };
    });
  }

  updateVoteExpirationDate (idx, e) {
    if (!idx) {
      const startDate = e._d.toString();

      this.setState((prevState, props) => {
        let poll = prevState.poll;
        poll.startDate = startDate;
        return { poll: Object.assign({}, poll) };
      });
    } else {
      const expirationDate = e._d.toString();

      this.setState((prevState, props) => {
        let poll = prevState.poll;
        poll.expirationDate = expirationDate;
        return { poll: Object.assign({}, poll) };
      });
    }
  }


  render () {
    return (
      <Modal show={this.props.showCreatePollModal} onHide={this.close.bind(this, "create")}>
        <Modal.Header>
          <Modal.Title>Create Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="option-group" >
          <FormGroup controlId="poll_title">
            <ControlLabel>Poll Title</ControlLabel>
            <FormControl onChange={this.updateTitle.bind(this)} type="text" placeholder="type your poll title"/>
          </FormGroup>
          <ControlLabel>Options</ControlLabel>
          <FormGroup controlId="option_1">
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="triangle-right" />
              </InputGroup.Addon>
              <FormControl onBlur={(e) => this.props.createNewOption(e.target.value)} type="text" placeholder="type poll option" />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="option_2">
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="triangle-right" />
              </InputGroup.Addon>
              <FormControl onBlur={(e) => this.props.createNewOption(e.target.value)} type="text" placeholder="type poll option" />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="option_3">
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="triangle-right" />
              </InputGroup.Addon>
              <FormControl onBlur={(e) => this.props.createNewOption(e.target.value)} type="text" placeholder="type poll option" />
            </InputGroup>
          </FormGroup>
          <ControlLabel>Start from</ControlLabel>
          <Datetime inputProps={{ placeholder: "pick the start date of voting period" }} isValidDate={this.validDate.bind(this, 0)} onChange={this.updateVoteExpirationDate.bind(this, 0)}/>
          <ControlLabel>Until</ControlLabel>
          <Datetime inputProps={{ placeholder: "pick the end date of voting period" }} isValidDate={this.validDate.bind(this, 1)} onChange={this.updateVoteExpirationDate.bind(this, 1)}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this, "create")}>Close</Button>
          <Button bsStyle="primary" onClick={() => this.props.onCreatePoll(this.state.poll)}>Create Poll</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreatePollModal.propTypes = {
  showCreatePollModal: PropTypes.bool.isRequired,
  createNewOption: PropTypes.func.isRequired,
  onCreatePoll: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default CreatePollModal;