import React from 'react';
import Board from '../Board';
import * as ReactRedux from "react-redux";
import {
    insertWinnerActionHandler,
    opponentTurnActionHandler,
    updateBoardActionHandler
} from "../../../reducers/reducers";

import Pusher from 'pusher-js';

var pusher = new Pusher('PUSHER_APP_KEY', {
    cluster: 'PUSHER_CLUSTER',
    forceTLS: true
});

class GameMechanics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: this.props.board.board,
            gameTag: this.props.players.player.gameTag

            //Array(9).fill(''), // 3x3 board
        };

        this.counter = 0;
    }

    onMakeMoveHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'MOVE_SET_BY_PLAYER'}));
    };

    onAnnounceWinnerHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_WINNER'}));
    }

    onAnnounceDrawHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_DRAW'}));
    }

    onOpponentTurnHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'OPPONENT_TURN'})); //display overlay
    }


    checkForWinner = async (squares) => {
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
                this.props.insertWinnerAction(squares[a]);
                this.onAnnounceWinnerHandler();
                return;
            }
        }

        // Check if the game ends in a draw
        this.counter++;
        // The board is filled up and there is no winner
        if (this.counter === 9) {
            this.onAnnounceDrawHandler();
        }
    };

    updateState = async () => {
        this.setState({
            squares: this.props.board.board.gameProgress,
        });
        await this.props.opponentTurnAction();
    };

    onMakeMove = async (index, gameTag) => {

        const squares = this.state.squares;

        // Check if the square is empty
        if (!squares[index]) {
            squares[index] = gameTag;

            await this.props.updateBoardAction(index, this.state.gameTag, this.props.players.gameId, squares);
            await this.props.opponentTurnAction();

            setTimeout(this.onMakeMoveHandler, 500);

            this.checkForWinner(squares);
        } else {
            console.log('taken already')
        }
    };

    render() {

        return (
            <div className="game">
                <div className="board">
                    <Board
                        squares={this.state.squares}
                        onClick={index => this.onMakeMove(index, this.state.gameTag)}
                    />
                    <button onClick={this.updateState}/>
                </div>
            </div>
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
        insertWinnerAction: (winnerTag) => dispatch(insertWinnerActionHandler(winnerTag)),
        opponentTurnAction: () => dispatch(opponentTurnActionHandler()),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameMechanics);

