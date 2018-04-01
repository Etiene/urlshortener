const Api = {
  checkStatus(response: Object) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return this.throwError(response);
    }
  },

  fetch(successCallback, errorCallback) {
    return window
      .fetch('/url', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => this.checkStatus(response))
      .then(body => successCallback(body))
      .catch(err => errorCallback(err));
  },

  send(data, successCallback, errorCallback) {
    return window
      .fetch('/url', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => this.checkStatus(response))
      .then(body => successCallback(body))
      .catch(err => errorCallback(err));
  },

  delete(id, successCallback, errorCallback) {
    return window
      .fetch('/url', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      .then(response => this.checkStatus(response))
      .then(body => successCallback(body))
      .catch(err => errorCallback(err));
  },
};

export default Api;
