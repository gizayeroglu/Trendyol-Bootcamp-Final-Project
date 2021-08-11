import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure } from "enzyme";

import Header from "../../components/Header/Header";

configure({ adapter: new Adapter() });

describe("Header component test", function () {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it("should render header", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a header text Spider Solitaire", function () {
    expect(wrapper.find("h1").text()).toEqual("Reversed Spider Solitaire");
  });

  it("should check class of h1 element", () => {
    const h1 = wrapper.hasClass("header");
    expect(h1).toEqual(true);
  });
});
