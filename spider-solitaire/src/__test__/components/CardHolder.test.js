import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, mount } from 'enzyme';

import CardHolder from '../../components/CardHolder/CardHolder';

configure({ adapter: new Adapter() });

describe('Card Holder component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardHolder />);
  });

  it('should render the card holder component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should form handle the submit', () => {
  //   const getNewCards = jest.fn();
  //   const wrapper = shallow(<CardHolder props={getNewCards}/>);
  //   const instance = wrapper.instance();
  //   const clickCard = wrapper
  //   .find('.card-distrubitor-container:nth-child(2)')
  //   expect(cl)
  //   // .simulate('click');
  //   expect(getNewCards).toHaveBeenCalled();
  // });
});
