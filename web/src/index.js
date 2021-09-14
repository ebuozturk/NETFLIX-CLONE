import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from "./redux/reducer/index"
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { Provider } from "react-redux";


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
