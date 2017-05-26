import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { Modal, FormGroup, FormControl, ControlLabel, InputGroup, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class PollDetailModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false
    };
  }

  close (key) {
    this.props.close(key);
  }

  openInput () {
    this.setState({
      showInput: true
    })
  }

  closeInput () {
    this.setState({
      showInput: false
    });
    this.props.updateFBOption();
  }

  render () {
    return (
      <Modal show={this.props.showPollDetailModal} onHide={this.close.bind(this, "detail")}>
        <Modal.Header closeButton>
          <Modal.Title>Poll Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{this.props.poll.title}</h3>
          <h5>Created by <b>{this.props.poll.username}</b></h5>
          <FormGroup>
            <ControlLabel>투표 기간</ControlLabel>
            <FormControl.Static>
              {Datetime.moment(this.props.poll.startDate).format('llll')} 부터
              <br/>
              {Datetime.moment(this.props.poll.expirationDate).format('llll')} 까지
            </FormControl.Static>
          </FormGroup>
          <hr />
          <ListGroup>
            {this.props.poll.options && this.props.poll.options.map((optionId, i) => {
              return (this.props.options.byId[optionId] && !this.state.showInput ?
                <ListGroupItem key={i}>{`${this.props.options.byId[optionId].text} : ${this.props.options.byId[optionId].count}`}</ListGroupItem>
                :
                <ListGroupItem key={i}>
                <InputGroup>
                  <FormControl onBlur={(e) => this.props.updateOption(optionId, e.target.value, this.props.options.byId[optionId].count)} type="text" placeholder={this.props.options.byId[optionId] ? this.props.options.byId[optionId].text : ''} />
                </InputGroup>
                </ListGroupItem>
                );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          {!this.state.showInput ?
            <Button onClick={this.openInput.bind(this)}>수정</Button>
            :
            <Button onClick={this.closeInput.bind(this)}>수정완료</Button>
          }
          <Button onClick={this.close.bind(this, "detail")}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

PollDetailModal.propTypes = {
  showPollDetailModal: PropTypes.bool.isRequired,
  poll: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  updateOption: PropTypes.func.isRequired,
  updateFBOption: PropTypes.func.isRequired
};

export default PollDetailModal;
