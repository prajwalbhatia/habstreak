import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';

let store;

const logger = createLogger({

});

if (process.env.REACT_APP_ENV === 'development')
  store = createStore(reducers, compose(applyMiddleware(thunk, logger)));
else
  store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);