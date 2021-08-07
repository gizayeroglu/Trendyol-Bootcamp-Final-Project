import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount, shallow } from 'enzyme';
// import { render, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

import GoBack from '../../components/GoBack/GoBack';

configure({adapter: new Adapter()});

describe('GoBack component test', function () {

  let wrapper;

  beforeEach(() => { 
    wrapper = shallow(<GoBack />);
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should check backbutton class', () => {
    const buttonTextCheck = wrapper.find('button').hasClass('go-back-button')
    expect(buttonTextCheck).toBeTruthy();
  })
});

