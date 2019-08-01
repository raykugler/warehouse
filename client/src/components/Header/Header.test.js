import React from "react";
import {shallow} from "enzyme";
import {Header} from './index';


describe('Header', function () {

  const header = shallow(<Header />);

  it('should render correctly', function () {
    expect(header).toMatchSnapshot();
  });
});