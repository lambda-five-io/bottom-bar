/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import App from '../client/src/components/App';

describe('Checks if App renders', () => {
  test('App component mounts', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toExist();
  });
});

// test if getSongs is called after componentDidMount
let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

it('should check `componentDidMount()`', () => {
  const instance = wrapper.instance();
  jest.spyOn(instance, 'getSongs');
  instance.componentDidMount();
  expect(instance.getSongs).toHaveBeenCalledTimes(1);
});
