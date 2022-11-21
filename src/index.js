import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css'
import './util/i18n';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './services/store/configureStore';
const { persistor, store } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate 
      loading={null}
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

