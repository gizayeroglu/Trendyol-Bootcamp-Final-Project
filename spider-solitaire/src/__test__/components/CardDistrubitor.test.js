import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow, mount } from "enzyme";

import CardDistrubitor from "../../components/CardDistrubitor/CardDistrubitor";

configure({ adapter: new Adapter() });

describe("Card Distrubitor component tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardDistrubitor />);
  });

  it("should render the card holder component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a div with the className card-distrubitor-container", () => {
    let div = wrapper.find("div");
    expect(div.hasClass("card-distrubitor-container")).toBeTruthy();
  });
});
