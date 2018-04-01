import React from 'react';
import { mount } from 'enzyme';
import Url from './index';

import Api from '../api';
jest.mock('../api');

const render = () => mount(<Url />);

describe('url/index', () => {
  it('fetches urls on mount', () => {
    render();
    expect(Api.fetch.mock.calls.length).toBe(1);
  });

  it('renders children components', () => {
    const comp = render();
    comp.setState({ urls: [{ id: 1 }] });
    expect(comp.find('UrlCreate').length).toBe(1);
    expect(comp.find('UrlList').length).toBe(1);
  });

  it('does not render UrlList when there are no urls', () => {
    const comp = render();
    comp.setState({ urls: [] });
    expect(comp.find('UrlList').length).toBe(0);
  });
});
