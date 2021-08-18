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
});
