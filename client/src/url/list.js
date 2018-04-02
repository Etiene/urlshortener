import React, { Component } from 'react';
import './list.css';

class UrlList extends Component {
  urlList() {
    return this.props.urls.map(url => {
      const fullAddress = 'http://localhost:3000/' + url.id;
      const displayUrl =
        url.url.length >= 42 ? url.url.substring(0, 42) + '...' : url.url;
      return (
        <p key={url.id}>
          <a href={fullAddress}>{fullAddress}</a> => {displayUrl} (visits:
          {url.visited})
          <button
            className="delete-button"
            value={url.id}
            onClick={this.props.removeUrlFromList}
          >
            X
          </button>
        </p>
      );
    });
  }

  render() {
    return <div className="url-list">{this.urlList()}</div>;
  }
}

export default UrlList;
