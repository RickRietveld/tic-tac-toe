import React, {Component} from 'react';
import * as ReactRedux from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {Router} from 'react-router';
import '../App.css';
import Login from "./menuOverview/Menu";
import Exit from "./exitOverview/Exit";
import {createBrowserHistory} from 'history';
import JoinGame from "./joinOverview/JoinGame";
import {fetchBoardUpdate} from "../reducers/reducers";
import CreateGame from "./createOverview/CreateGame";
import Game from "./boardOverview/Game";

export const history = createBrowserHistory();

const URL = 'ws://localhost:3000';

class App extends Component {

    ws = new WebSocket(URL);
    submitMessage = messageString => {
        this.ws.send(messageString)
    };

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
        };

        this.ws.onmessage = async (evt) => {

            let obj = JSON.parse(evt.data);
            let gameId = this.props.players.gameId;

            switch (obj.message) {
                case 'USER_REGISTERED':
                    //await this.props.fetchPlayerList(gameId);
                    break;
                case 'MOVE_SET_BY_PLAYER':
                    await this.props.fetchBoardUpdate(gameId);
                    break;
                case 'ANNOUNCE_WINNER':
                    return history.push('/exit');
                case 'ANNOUNCE_DRAW':
                    return history.push('/exit');
                default:
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected');
        }
    }

    render() {
        return (
            <Router history={history}>
                        <Switch>
                            <Route path='/' exact render={(routeProps) => <Login routeProps={routeProps}
                                                                                 onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/create' exact render={(routeProps) => <CreateGame routeProps={routeProps}
                                                                                            onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/join' render={(routeProps) => <JoinGame routeProps={routeProps}
                                                                                  onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/game' render={(routeProps) => <Game routeProps={routeProps}
                                                                              onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/exit' render={(routeProps) => <Exit routeProps={routeProps}
                                                                              onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                        </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.players
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //fetchPlayerList: (gameId) => dispatch(fetchPlayerList(gameId)),
        fetchBoardUpdate: (gameId) => dispatch(fetchBoardUpdate(gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
