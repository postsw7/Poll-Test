import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('App Component', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });

  it('should render an `.App`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).toHaveLength(1);
  });
});
