import React from 'react';
import { mount } from 'enzyme';
import UrlCreate from './create';

const defaultProps = {
  successCallback: () => {},
};

const render = () => mount(<UrlCreate {...defaultProps} />);

describe('url/create', () => {
  it('displays create form when clicked', () => {
    const comp = render();
    const button = comp.find('button');
    button.simulate('click');
    const form = comp.find('UrlCreateForm');
    expect(form.length).toBe(1);
  });
});
