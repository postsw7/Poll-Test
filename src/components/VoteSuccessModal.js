import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, Button } from 'react-bootstrap';

class VoteSuccessModal extends Component {
  handleVoteSuccess () {
    this.props.handleVoteSuccess();
  }

  close (key) {
    this.props.close(key);
  }

  render () {
    return (
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
    );
  }
}

VoteSuccessModal.propTypes = {
  showVoteSuccessModal: PropTypes.bool.isRequired,
  handleVoteSuccess: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default VoteSuccessModal;
