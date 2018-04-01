import React from 'react';
import { mount } from 'enzyme';
import UrlCreateForm from './create-form';

import Api from '../api';
jest.mock('../api');

const defaultProps = {
  callback: () => {},
};

const render = () => mount(<UrlCreateForm {...defaultProps} />);

const submit = (comp, url) => {
  Api.send.mockClear();
  const input = comp.find('input[type="text"]');
  const form = comp.find('form');
  input.simulate('change', { target: { value: url } });
  form.simulate('submit');
};

describe('url/create-form', () => {
  it('creates shortener', () => {
    const comp = render();
    submit(comp, 'http://google.com');
    expect(Api.send.mock.calls.length).toBe(1);
  });

  it('does not create shortener if url is invalid', () => {
    const comp = render();
    submit(comp, '');
    submit(comp, '@42');
    expect(Api.send.mock.calls.length).toBe(0);
  });
});
