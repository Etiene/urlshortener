import React, { Component } from 'react';
import './list.css';

class UrlList extends Component {
  urlList() {
    return this.props.urls.map(url => {
      const fullAddress = 'http://localhost:3000/' + url.id;
      return (
        <p key={url.id}>
          <a href={fullAddress}>{fullAddress}</a> => {url.url} (visits:
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
