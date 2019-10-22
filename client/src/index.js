import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styling/css/style.css';
import {mainReducer} from './reducers/reducers';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import thunk from "redux-thunk";

const logger = (store) => (next) => (action) => {
    console.log('ACTION:', action.type, action);
    let result = next(action);
    console.log('STATE AFTER ACTION:', action.type, store.getState());
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const theStore = Redux.createStore(mainReducer, composeEnhancers(
    Redux.applyMiddleware(logger, thunk)
));

const mainComponent =
    <ReactRedux.Provider store={theStore}>
        <App/>
    </ReactRedux.Provider>;

ReactDOM.render(mainComponent, document.getElementById('root'));