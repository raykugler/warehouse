import React from 'react';
import {shallow} from 'enzyme';
import Root from './Root';


it('should render properly', function () {
  const root = shallow(<Root/>);
  expect(root).toMatchSnapshot();
});