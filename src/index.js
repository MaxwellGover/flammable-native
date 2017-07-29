import React from 'react';
import { Text, View } from 'react-native';
import { App } from '~/components';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as reducers from './redux';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(ReduxThunk)
)

function Flammable() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Flammable;
