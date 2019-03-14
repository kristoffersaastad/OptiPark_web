import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import Root from './Root';

import * as serviceWorker from './serviceWorker';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Root store={store} />,
  document.getElementById("root")
);
serviceWorker.register();