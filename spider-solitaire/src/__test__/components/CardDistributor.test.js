import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';

import CardDistributor from '../../components/CardDistributor/CardDistributor';

configure({ adapter: new Adapter() });

describe('Card Distrubitor component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardDistributor  />);
  });

  it('should render the card holder component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have clickable cards to deal with new 10 cards', () => {
    const getNewCards = jest.fn();
    const wrapper = shallow(<CardDistributor getNewCards={getNewCards}/>)
    expect(getNewCards).toHaveBeenCalledTimes(0);
    wrapper.find('.card-distrubitor-container').children().at(1).simulate('click');
    expect(getNewCards).toHaveBeenCalledTimes(1);
  });

});
