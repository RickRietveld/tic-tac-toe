import React, {Component} from 'react';
import * as ReactRedux from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import {Router} from 'react-router';
import '../App.css';
import Login from "./menuOverview/Menu";
import Exit from "./exitOverview/Exit";
import {createBrowserHistory} from 'history';
import JoinGame from "./joinOverview/JoinGame";
import {fetchBoardUpdate, fetchPlayerList} from "../reducers/reducers";
import CreateGame from "./createOverview/CreateGame";
import Game from "./boardOverview/Game";

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
                    await this.props.fetchPlayerList();
                    break;
                case 'MOVE_SET_BY_PLAYER':
                    await this.props.fetchBoardUpdate(this.props.players.gameId);
                    break;
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
            <Router history={history}>
                        <Switch>
                            <Route path='/' exact render={(routeProps) => <Login routeProps={routeProps}
                                                                                 onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/create' exact render={(routeProps) => <CreateGame routeProps={routeProps}
                                                                                            onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/join' render={(routeProps) => <JoinGame routeProps={routeProps}
                                                                                  onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/board' render={(routeProps) => <Game routeProps={routeProps}
                                                                               onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                            <Route path='/exit' render={(routeProps) => <Exit routeProps={routeProps}
                                                                              onSubmitMessage={messageString => this.submitMessage(messageString)}/>}/>
                        </Switch>
            </Router>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        players: state.players
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlayerList: () => dispatch(fetchPlayerList()),
        fetchBoardUpdate: (gameId) => dispatch(fetchBoardUpdate(gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
