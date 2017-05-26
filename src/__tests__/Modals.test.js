import React from 'react';
import { shallow } from 'enzyme';
import ModalManager from '../components/ModalManager';
import VoteSuccessModal from '../components/VoteSuccessModal';
import PollDetailModal from '../components/PollDetailModal';
import PollVotingModal from '../components/PollVotingModal';
import CreatePollModal from '../components/CreatePollModal';
import { Modal } from 'react-bootstrap';

describe('Modal Components', () => {

  const mockData = jest.fn();

  beforeEach(() => {
    mockData.mockReturnValue({});
    const ModalManagerComponent = (
      <ModalManager
        showCreatePollModal={false}
        showPollDetailModal={false}
        showVoteSuccessModal={false}
        showPollVotingModal={false}
        onCreatePoll={mockData}
        createNewOption={mockData}
        incrementVote={mockData}
        decrementVote={mockData}
        updateFBOption={mockData}
        handleVoteSubmit={mockData}
        handleVoteSuccess={mockData}
        close={mockData}
        updateOption={mockData}
        poll={mockData()}
        options={mockData()}
      />
    );


  })

  it('should render without crashing', () => {
    const ModalManagerComponent = (
      <ModalManager
        showCreatePollModal={false}
        showPollDetailModal={false}
        showVoteSuccessModal={false}
        showPollVotingModal={false}
        onCreatePoll={mockData}
        createNewOption={mockData}
        incrementVote={mockData}
        decrementVote={mockData}
        updateFBOption={mockData}
        handleVoteSubmit={mockData}
        handleVoteSuccess={mockData}
        close={mockData}
        updateOption={mockData}
        poll={mockData()}
        options={mockData()}
      />
    );
    shallow(ModalManagerComponent);
  });

  it('should render <Modal /> component', () => {
    const ModalManagerComponent = (
      <ModalManager
        showCreatePollModal={false}
        showPollDetailModal={false}
        showVoteSuccessModal={false}
        showPollVotingModal={false}
        onCreatePoll={mockData}
        createNewOption={mockData}
        incrementVote={mockData}
        decrementVote={mockData}
        updateFBOption={mockData}
        handleVoteSubmit={mockData}
        handleVoteSuccess={mockData}
        close={mockData}
        updateOption={mockData}
        poll={mockData()}
        options={mockData()}
      />
    );
    const wrapper = shallow(ModalManagerComponent);
    expect(wrapper).toBeDefined();
  });

  it('should render <CreatePollModal /> components', () => {
    const CreatePollModalComponent = (
      <CreatePollModal
        showCreatePollModal={false}
        createNewOption={mockData}
        onCreatePoll={mockData}
        close={mockData}
      />
    );
    const wrapper = shallow(CreatePollModalComponent);
    expect(wrapper).toBeDefined();
  });

  it('should render <PollDetailModal /> components', () => {
    const PollDetailModalComponent = () => {
      return (
        <PollDetailModal
          showPollDetailModal={false}
          poll={mockData()}
          options={mockData()}
          close={mockData}
          updateOption={mockData}
          updateFBOption={mockData}
        />
      );
    }
    const wrapper = shallow(PollDetailModalComponent());
    expect(wrapper).toBeDefined();
  });

  it('should render <PollVotingModal /> components', () => {
    const PollVotingModalComponent = () => {
      return (
        <PollVotingModal
          showPollVotingModal={false}
          incrementVote={mockData}
          decrementVote={mockData}
          handleVoteSubmit={mockData}
          updateFBOption={mockData}
          poll={mockData()}
          options={mockData()}
          close={mockData}
        />
      );
    }
    const wrapper = shallow(PollVotingModalComponent());
    expect(wrapper).toBeDefined();
  });

  it('should render <VoteSuccessModal /> components', () => {
    const VoteSuccessModalComponent = (
      <VoteSuccessModal
        showVoteSuccessModal={false}
        handleVoteSuccess={mockData}
        close={mockData}
      />
    );
    const wrapper = shallow(VoteSuccessModalComponent);
    expect(wrapper).toBeDefined();
  });

})