import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Url from './url';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Url />, document.getElementById('root'));
registerServiceWorker();
