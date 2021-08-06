import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';

import Card from '../../components/Card/Card';

configure({adapter: new Adapter()});


describe('Header component test', function () {

  let wrapper;

  beforeEach(() => { 
    wrapper = shallow(<Card />);
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  // it('should have class name card-back if the given card prop false, card is not the last card in the holder line', function () {
  //   const cardprop = jest.fn();
  //   const wrapper = shallow(<Card props = { cardprop, false } />);
  //   expect(wrapper.find('div').hasClass('card card-back')).toBeTruthy();
  // });

  // it('should have class name card-back if the given card prop false, card is not the last card in the holder line', function () {
  //   const cardprop = jest.fn();

  //   const wrapper = mount(<Card props = { cardprop, true } />);
  //   expect(wrapper.find('div').hasClass('card card-front')).toBeTruthy();
  // });
});