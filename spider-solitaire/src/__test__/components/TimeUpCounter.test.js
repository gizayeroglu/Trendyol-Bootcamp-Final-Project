import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure } from "enzyme";

import TimeUpCounter from "../../components/TimeUpCounter/TimeUpCounter";

configure({ adapter: new Adapter() });

describe("Time Up Counter component test", function () {
  let wrapper;

  it("should render", () => {
    wrapper = shallow(<TimeUpCounter />);
    expect(wrapper).toMatchSnapshot();
  });
});