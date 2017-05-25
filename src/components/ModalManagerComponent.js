import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Modals.css';
import Datetime from 'react-datetime';
import { Glyphicon, Modal, Button, FormGroup, InputGroup, FormControl, ControlLabel, Checkbox, ListGroup, ListGroupItem } from 'react-bootstrap';

class ModalManager extends Component {
  constructor(props) {
    super(props);

    this.validDate = ( current ) => {
        return current.isAfter( Datetime.moment().subtract( 1, "day" ) );
    };

    this.state = {
      poll: {}
    };
  }

  close (key) {
    this.props.close(key);
  }

  handleVoteSubmit (e) {
    e.preventDefault();
    console.log(this.props.poll, '투표!!');
    this.props.close("voting");
    this.props.handleSubmit(this.props.poll);
    this.props.updatePollandOption(this.state.poll);
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
    // this.setState((prevState, props) => {
    //   let poll = this.props.poll;
    //   poll.options = poll.options || {};
    //   isChecked ? poll.options[idx].count++ : poll.options[idx].count--;
    //   return { poll: Object.assign({}, poll) };
    // });
  }

  handleVoteSuccess () {
    this.props.handleVoteSuccess();
  }

  // updateOption (idx, e) {
  //   const value = e.target.value;

  //   this.setState((prevState, props) => {
  //     let poll = prevState.poll;
  //     poll.options = poll.options || [];
  //     poll.options[idx] = { count: 0, key: value };
  //     return { poll: Object.assign({}, poll) };
  //   });
  // }

  updateTitle (e) {
    const value = e.target.value;

    this.setState((prevState, props) => {
      let poll = prevState.poll;
      poll.title = value;
      return { poll: Object.assign({}, poll) };
    });
  }

  updateVoteExpirationDate (e) {
    const expirationDate = e._d.toString();

    this.setState((prevState, props) => {
      let poll = prevState.poll;
      poll.expirationDate = expirationDate;
      return { poll: Object.assign({}, poll) };
    });
  }

  // updateUsername (e) {
  //   const username = e.target.value;

  //   this.setState((prevState, props) => {
  //     let poll = prevState.poll;
  //     poll.username = username;
  //     return { poll: Object.assign({}, poll) };
  //   });
  // }

  render() {

    return (
      <div>
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
            {/*<FormGroup controlId="username">
              <ControlLabel>Name</ControlLabel>
              <FormControl onChange={this.updateUsername.bind(this)} type="text" placeholder="type your name"/>
            </FormGroup>*/}
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
            <ControlLabel>Voting Period</ControlLabel>
            <Datetime inputProps={{ placeholder: "pick the end of voting period", ref: (ref) => { this.expirationDate = ref;} }} isValidDate={this.validDate} onChange={this.updateVoteExpirationDate.bind(this)}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this, "create")}>Close</Button>
            <Button bsStyle="primary" onClick={() => this.props.onCreatePoll(this.state.poll)}>Create Poll</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.props.showPollVotingModal} onHide={this.close.bind(this, "voting")}>
          <Modal.Header closeButton>
            <Modal.Title>Poll Voting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.props.poll ? this.props.poll.title : null}</h3>
            <h5>Created by {this.props.poll ? this.props.poll.username : null}</h5>
            <p><b>{this.props.poll ? this.props.poll.expirationDate : null}</b></p>
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

        <Modal show={this.props.showPollDetailModal} onHide={this.close.bind(this, "detail")}>
          <Modal.Header closeButton>
            <Modal.Title>Poll Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.props.poll.title}</h3>
            <h5>Created by {this.props.poll.username}</h5>
            <FormGroup>
              <ControlLabel>투표 기간</ControlLabel>
              <FormControl.Static>
                ~ {this.props.poll.expirationDate} 까지
              </FormControl.Static>
            </FormGroup>
            <hr />
            <ListGroup>
              {this.props.poll.options && this.props.poll.options.map((optionId, i) => {
                return (this.props.options.byId[optionId] ?
                  <ListGroupItem key={i}>{`${this.props.options.byId[optionId].text} : ${this.props.options.byId[optionId].count}`}</ListGroupItem>
                  : '');
              })}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this, "detail")}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.props.showVoteSuccessModal} onHide={this.close.bind(this, "success")}>
          <Modal.Header closeButton>
            <Modal.Title>Vote Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>투표에 참여해주셔서 감사합니다.</h5>
            <form>
              <FormGroup>
                <Button bsStyle="primary" onClick={this.handleVoteSuccess.bind(this)}>
                  투표 결과 보기
                </Button>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this, "success")}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalManager.propTypes = {
  showCreatePollModal: PropTypes.bool.isRequired,
  showVoteSuccessModal: PropTypes.bool.isRequired,
  showPollDetailModal: PropTypes.bool.isRequired,
  showPollVotingModal: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onCreatePoll: PropTypes.func.isRequired,
  poll: PropTypes.object
};

export default ModalManager;
