import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

import Header from '../../components/Header/Header';

configure({ adapter: new Adapter() });

describe('Header component test', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a header text', function () {
    expect(wrapper.find('h1').text()).toEqual('Reversed Spider Solitaire');
  });

  it('should have h1 with the class name header', () => {
    const h1 = wrapper.hasClass('header');
    expect(h1).toEqual(true);
  });
});
