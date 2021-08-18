import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

import App from '../App';

configure({adapter: new Adapter()});

describe('App test', function () {

  let wrapper;

  beforeEach(() => { 
    wrapper = shallow(<App />);
  })

  it('should render App', () => {
    expect(wrapper).toMatchSnapshot();
  })
})