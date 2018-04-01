import React, { Component } from 'react';
import UrlCreate from './create';
import UrlList from './list';
import Api from '../api';
import './index.css';

class Url extends Component {
  state = {};

  componentDidMount() {
    Api.fetch(
      result => {
        this.setState({ urls: JSON.parse(result['urls']) });
      },
      () => {
        console.log('Error fetching urls ');
      },
    );
  }

  addUrlToList = response => {
    this.setState({ urls: this.state.urls.concat([response]) });
  };

  removeUrlFromList = event => {
    event.persist();
    Api.delete(
      event.target.value,
      () => {
        const index = this.state.urls
          .map(url => url.id)
          .indexOf(event.target.value);
        this.state.urls.splice(index, 1);
        this.setState({ urls: this.state.urls });
      },
      () => {
        console.log('Error deleting url');
      },
    );
  };

  render() {
    const urls = this.state.urls || [];
    return (
      <div>
        <div className="title">Sample URL Shortener</div>
        <UrlCreate successCallback={this.addUrlToList} />
        {urls.length > 0 && (
          <UrlList urls={urls} removeUrlFromList={this.removeUrlFromList} />
        )}
      </div>
    );
  }
}

export default Url;
