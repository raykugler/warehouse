import React from 'react';
import {shallow} from 'enzyme';
import {Footer} from './index';

describe('Footer', () => {

  const props = {
    name: 'test name',
    url: 'http://test.com/url',
    text: 'some text'
  };
  const footer = shallow(<Footer {...props}/>);

  it('should render properly', function () {
    expect(footer).toMatchSnapshot();
  });

  it('should contains link', function () {
    expect(footer.find('a').props())
      .toHaveProperty('href', props.url);
  });

  it('should contains text', function () {
    expect(footer.text()).toContain(props.text);
  });

  it('should contains name', function () {
    expect(footer.text()).toContain(props.name);
  });
});