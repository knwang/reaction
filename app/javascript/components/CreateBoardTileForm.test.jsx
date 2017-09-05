import React from 'react';
import { mount } from 'enzyme';

import CreateBoardTileForm from './CreateBoardTileForm';

import apiClient from '../lib/api_client';

jest.mock('../lib/api_client');

describe("CreateBoardTileForm", () => {
  it("displays the `title` prop", () => {
    const wrapper = mount(
      <CreateBoardTileForm
        title="This is my title!!"
        onTextChange={() => {}}
      />
    );

    expect(
      wrapper.html().indexOf('value="This is my title!!"')
    )
  });
});
