import React from 'react';
import { render } from 'react-dom';
import './i18n';

import './index.css';
import App from './App';

import {createStore, compose} from "redux";
import {Provider} from 'react-redux'
import reducer from './redux/reducers'
const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// store.subscribe(() => {
//     console.log('subscribe', store.getState())
// })

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
