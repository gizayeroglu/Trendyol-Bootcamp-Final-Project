import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';

import Card from '../../components/Card/Card';

configure({ adapter: new Adapter() });

describe('Card component test', function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display card as open if is last card props is true', () => {
    const isOpen = true;
    const component = shallow(<Card isOpen={isOpen} />);
    let card = component.find('div');
    expect(card.hasClass('card-front')).toBeTruthy();
  });

  it('should display card as closed if is last card props is false', () => {
    const isOpen = false;
    const component = shallow(<Card isOpen={isOpen} />);
    let card = component.find('div');
    expect(card.hasClass('card-back')).toBeTruthy();
  });

  it('should display card as higlighted when isHighlighted and isOpen true', () => {
    const isHighlighted = true;
    const isOpen = true;
    const component = shallow(<Card isHighlighted={isHighlighted} isOpen={isOpen} />);
    let card = component.find('div');
    expect(card.hasClass('card card-front highlighted')).toBeTruthy();
  });
});
