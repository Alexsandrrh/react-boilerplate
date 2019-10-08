import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootStore from './store';
import App from './App';
import './assets/scss/main.scss';

const browserHistory = createBrowserHistory();
let store = null;
if (IS_DEV) {
  store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)));
} else {
  store = createStore(rootStore, applyMiddleware(thunk));
}
const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootEl
);
