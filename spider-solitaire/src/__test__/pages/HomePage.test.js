import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, mount } from 'enzyme';

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

  // it('should have a clickable div that transfers home page', () => {
  //     const mockCallBackClick = jest.fn();
  //     wrapper = shallow(<HomePage onCardClick={mockCallBackClick}/>);
  //     wrapper.find('.play-game-card').simulate('click');
  //     expect(mockCallBackClick.mock.calls.length).toEqual(1);
  // })
});
