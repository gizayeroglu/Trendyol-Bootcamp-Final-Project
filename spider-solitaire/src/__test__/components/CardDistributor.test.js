import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow, mount } from "enzyme";

import CardDistributor from "../../components/CardDistributor/CardDistributor";

configure({ adapter: new Adapter() });

describe("Card Distrubitor component tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardDistributor  />);
  });

  it("should render the card holder component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
