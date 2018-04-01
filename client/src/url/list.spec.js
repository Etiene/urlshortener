import React from 'react';
import { mount } from 'enzyme';
import UrlList from './list';

const defaultProps = {
  urls: [
    { id: 1, url: 'hello', visited: 0 },
    { id: 2, url: 'world', visited: 2 },
  ],
  removeUrlFromList: () => {},
};

const render = props => mount(<UrlList {...defaultProps} {...props} />);

describe('url/list', () => {
  it('shows a list of urls', () => {
    const comp = render();
    const links = comp.find('a');
    expect(links.length).toBe(2);
  });

  it('runs remove callback when clicked', () => {
    const removeUrlFromList = jest.fn();
    const comp = render({ removeUrlFromList });
    const button = comp.find('button').first();
    button.simulate('click');
    expect(removeUrlFromList.mock.calls.length).toBe(1);
  });
});
