import React from 'react';
import Board from './boardComponents/Board';
import * as ReactRedux from "react-redux";
import {fetchTurnCounter, insertWinnerActionHandler, updateBoardActionHandler} from "../../reducers/reducers";

import Pusher from 'pusher-js';

let pusher = new Pusher('8787ac6d77c8d767b723', {
    cluster: 'eu',
    forceTLS: true
});

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(''),
            gameTag: this.props.players.player.gameTag,
            currentTurn: this.props.players.player.currentTurn
        };
    }

    onMakeMoveHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'MOVE_SET_BY_PLAYER'}));
    };

    onAnnounceWinnerHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_WINNER'}));
    };

    onAnnounceDrawHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_DRAW'}));
    };

    componentDidMount() {
        const gameId = this.props.players.gameId;
        const channel = pusher.subscribe(`game-${gameId}`);
        channel.bind('board-updated', () => {
            this._refreshGame();
        });
    }

    componentWillUnmount() {
        const gameId = this.props.players.gameId;
        pusher.unsubscribe(`game-${gameId}`);
    }

    _refreshGame = async () => {
        this.setState({
            squares: this.props.board.board.gameProgress
        });
    };

    checkForWinner = async (squares) => {
        let maxNr = 9;
        // Possible winning combinations
        const possibleCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Iterate every combination to see if there is a match
        for (let i = 0; i < possibleCombinations.length; i += 1) {
            const [a, b, c] = possibleCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                await this.props.insertWinnerAction(this.props.players.gameId, squares[a]);
                this.onAnnounceWinnerHandler();
                return;
            }
        }
        // Check if the game ends in a draw
        // The board is filled up and there is no winner
        if (this.props.board.turnCount === maxNr) {
            this.onAnnounceDrawHandler();
        }
    };

    onMakeMove = async (index, gameTag) => {
        const squares = this.state.squares;

        // Check if the square is empty
        if (!squares[index]) {
            squares[index] = gameTag;

            await this.props.updateBoardAction(index, this.state.gameTag, this.props.players.gameId, squares);
            await this.props.fetchTurnCount(this.props.players.gameId);
            await this.onMakeMoveHandler();
            this.checkForWinner(squares);
        }
    };

    render() {
        return (<>
                <h1 className="title">Tic Tac Toe</h1>
                <h1 className="gameNumber">Game number: {this.props.players.gameId}</h1>
                    <div className="game">
                        <div className="board">
                            <Board
                                squares={this.state.squares}
                                onClick={index => this.onMakeMove(index, this.state.gameTag)}
                            />
                        </div>
                    </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
        board: state.mainBoard,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBoardAction: (index, gameTag, board, gameId) => dispatch(updateBoardActionHandler(index, gameTag, board, gameId)),
        insertWinnerAction: (gameId, winnerTag) => dispatch(insertWinnerActionHandler(gameId, winnerTag)),
        fetchTurnCount: (gameId) => dispatch(fetchTurnCounter(gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Game);

