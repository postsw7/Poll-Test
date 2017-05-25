import React from 'react';
import { shallow } from 'enzyme';
import ModalManager from './ModalManagerComponent';
import { Modal } from 'react-bootstrap';

it('should render without crashing', () => {
  shallow(<ModalManager />);
});

it('should render <Modal /> component', () => {
  const wrapper = shallow(<ModalManager />);
  expect(wrapper).toBeDefined();
});

it('should render four <Modal /> components', () => {
  const wrapper = shallow(<ModalManager />);
  expect(wrapper.find(Modal)).toHaveLength(4);
});

