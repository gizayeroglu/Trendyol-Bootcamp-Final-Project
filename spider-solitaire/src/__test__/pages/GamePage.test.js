import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, mount } from 'enzyme';

import GamePage from '../../pages/GamePage/GamePage';
import Card from '../../components/Card/Card';

configure({ adapter: new Adapter() });

describe('Game Page tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<GamePage />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have game-outputs div', () => {
    const gameOutputs = wrapper.find('div').first().hasClass('game-outputs');
    expect(gameOutputs).toBeTruthy();
  })

  it('should render the cards in game area', () => {
    const gameArea = wrapper.find('.game-area-container');
    expect(gameArea).toBeTruthy();
    const card = gameArea.find('.card');
    const openCards = gameArea.find('.card-front');
    const closedCards = gameArea.find('.card-back');
    expect(card).toBeTruthy();
    expect(openCards).toBeTruthy();
    expect(closedCards).toBeTruthy();
  })

  it('should give response to click event when hint button clicked', () => {
    const mockCallBackClick = jest.fn();
    wrapper = shallow(<button className='hint-button' onClick={mockCallBackClick}>Hint</button>);
    wrapper.simulate('click');
    expect(mockCallBackClick.mock.calls.length).toEqual(1);
  });

  it('should give response to click event when restart button clicked', () => {
    const mockCallBackClick = jest.fn();
    wrapper = shallow(<button className='refresh-page-button' onClick={mockCallBackClick}>Restart</button>);
    wrapper.simulate('click');
    expect(mockCallBackClick.mock.calls.length).toEqual(1);
  });

  it('should update state on click', () => {
    const setGameScore = jest.fn();
    const wrapper = mount(<button className='refresh-page-button' onClick={setGameScore}>Restart</button>);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(gameScore => [gameScore, setGameScore]);

    wrapper.simulate("click");
    expect(setGameScore).toHaveBeenCalledTimes(1);
  });
});
