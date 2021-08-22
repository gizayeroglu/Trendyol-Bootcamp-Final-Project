import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';

import HomePage from '../../pages/HomePage/HomePage';

configure({ adapter: new Adapter() });

describe('Home Page tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
