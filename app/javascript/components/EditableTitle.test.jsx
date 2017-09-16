import React from 'react';
import { shallow } from 'enzyme';

import EditableTitle from './EditableTitle';

describe("EditableTitle", () => {
  it("displays the `title` prop value", () => {
    const wrapper = shallow(
      <EditableTitle 
        title="This is my title"
        onChange={() => {}}
        onKeyPress={() => {}}
        onBlur={() => {}}
      />
    );

    expect(wrapper.html().match("This is my title")).not.toBe(null);
  });
});
