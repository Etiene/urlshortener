import React, { Component } from 'react';
import validUrl from 'valid-url';
import Api from '../api';

class UrlCreateForm extends Component {
  state = {
    url: '',
    errorMsg: '',
  };

  handleError = () => {
    this.setState({ errorMsg: 'An error happened while shortening your url' });
  };

  handleResponse = body => {
    if (!body.msg) {
      this.props.callback(body);
    } else {
      this.setState({ errorMsg: body.msg });
    }
  };

  handleSubmit = event => {
    const { url } = this.state;
    if (validUrl.isUri(url)) {
      Api.send({ url }, this.handleResponse, this.handleError);
    } else {
      this.setState({ errorMsg: 'Please submit a valid url' });
    }
    event.preventDefault();
  };

  updateUrlValue = event => {
    this.setState({ url: event.target.value });
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.updateUrlValue}
            placeholder="http://some-url.com"
          />
          <input type="submit" value="Shorten" />
        </form>
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    );
  }
}

export default UrlCreateForm;
