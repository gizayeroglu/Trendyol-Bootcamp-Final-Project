import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';

import GoBack from '../../components/GoBack/GoBack';

configure({ adapter: new Adapter() });

describe('Go Back component test', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GoBack />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have button with the class name go-back-button', () => {
    const buttonTextCheck = wrapper.find('button').hasClass('go-back-button');
    expect(buttonTextCheck).toBeTruthy();
  });
});
