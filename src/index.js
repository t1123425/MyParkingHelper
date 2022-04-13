import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css'
import App from './App';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import allreducers from './services/reducers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './services/store/configureStore';
const { persistor, store } = configureStore()

//import reportWebVitals from './reportWebVitals';
//const mainStore = createStore(allreducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
