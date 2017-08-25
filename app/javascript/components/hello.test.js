import Hello from './hello';
import React from 'react';
import { shallow } from 'enzyme';

describe("Hello World", () => {
  it('renders a div', () => {
    const wrapper = shallow(<Hello name="World" />);

    expect(
      wrapper.contains(<div>Hello World!</div>)
    ).toBe(true);
  });

  it("Should pass", () => {
    expect("Hello World").toEqual("Hello World");
  });
});
