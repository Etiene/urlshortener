import React, { Component } from 'react';
import UrlCreateForm from './create-form';
import './create.css';

class UrlCreate extends Component {
  state = {
    showUrlCreateForm: false,
  };

  toggleCreate = () => {
    this.setState({ showUrlCreateForm: !this.state.showUrlCreateForm });
  };

  successCallback = body => {
    this.props.successCallback(body);
    this.toggleCreate();
  };

  render() {
    const { showUrlCreateForm } = this.state;

    return (
      <div className="create-div">
        {!showUrlCreateForm ? (
          <button className="create-button" onClick={this.toggleCreate}>
            Shorten URL
          </button>
        ) : (
          <UrlCreateForm callback={this.successCallback} />
        )}
      </div>
    );
  }
}

export default UrlCreate;
