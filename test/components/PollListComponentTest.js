/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import PollListComponent from 'components/PollListComponent.js';

describe('PollListComponent', function () {
  let component;

  beforeEach(function () {
    component = createComponent(PollListComponent);
  });

  it('should have its component name as default className', function () {
    expect(component.props.className).to.equal('polllist-component');
  });
});
