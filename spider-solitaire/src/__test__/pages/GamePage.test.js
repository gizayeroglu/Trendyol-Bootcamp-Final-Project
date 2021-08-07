import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow, mount } from 'enzyme';

import GamePage from '../../pages/GamePage/GamePage';

configure( {adapter: new Adapter()});

describe('Game Page tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GamePage />);
    })

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    })
});