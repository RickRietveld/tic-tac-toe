import {Component} from 'react';
import * as ReactRedux from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {Router} from 'react-router';
import '../App.css';
import Login from "./loginOverview/Login";
import Board from "./boardOverview/Board";
import Exit from "./exitOverview/Exit";

import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

const URL = 'ws://localhost:3000';
let clientCount = 0;

class App extends Component {

    ws = new WebSocket(URL);
    submitMessage = messageString => {
        this.ws.send(messageString)
    };

    async componentDidMount() {

        this.ws.onopen = () => {
            console.log('connected');
            clientCount++;
            console.log(clientCount)
        };


        this.ws.onmessage = async (evt) => {

            let obj = JSON.parse(evt.data);

            // eslint-disable-next-line default-case
            switch (obj.message) {
                case 'USER_REGISTERED':
                    return history.push('/board');
                case 'GAME_ENDED':
                    return history.push('/exit');
            }
        };


        this.ws.onclose = () => {
            console.log('disconnected');
        }
    }

    render() {
        return (
            < Router
        history = {history} >
            < div
        className = "App text-center mt-5 mb-5" >
            < h1
        id = "logo" > TicTacToe < /h1>
            < /div>
            < div
        className = "App" >

            < div
        className = "container"
        style = {
        {
            marginTop: '200px'
        }
    }>

    <
        Switch >
        < Route
        path = '/'
        exact
        render = {(routeProps)
    => <
        Login
        routeProps = {routeProps}
        onSubmitMessage = {messageString
    =>
        this.submitMessage(messageString)
    }
        />}/ >
        < Route
        path = '/board'
        render = {(routeProps)
    => <
        Board
        routeProps = {routeProps}
        onSubmitMessage = {messageString
    =>
        this.submitMessage(messageString)
    }
        />}/ >
        < Route
        path = '/exit'
        render = {(routeProps)
    => <
        Exit
        routeProps = {routeProps}
        onSubmitMessage = {messageString
    =>
        this.submitMessage(messageString)
    }
        />}/ >
        < /Switch>

        < /div>
        < /div>
        < /Router>
    )
        ;
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
