import React from 'react';
import Board from '../Board';
import * as ReactRedux from "react-redux";
import {updateBoardActionHandler} from "../../../reducers/reducers";

class GameMechanics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(''), // 3x3 board
            gameTag: this.props.players.player.gameTag
        };

        this.counter = 0;
    }

    onMakeMoveHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'MOVE_SET_BY_PLAYER'}));
    };


    checkForWinner = (squares) => {
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
                //this.announceWinner(squares[a]);
                console.log('neger');
                return;
            }
        }

        // Check if the game ends in a draw
        this.counter++;
        // The board is filled up and there is no winner
        if (this.counter === 9) {
            this.gameOver = true;
            //this.newRound(null);
        }
    };

    // // Opponent's move is published to the board
    // publishMove = (index, piece) => {
    //     const squares = this.state.squares;
    //
    //     squares[index] = piece;
    //     this.turn = (squares[index] === 'X')? 'O' : 'X';
    //
    //     this.setState({
    //         squares: squares,
    //     });
    //
    //     this.checkForWinner(squares)
    // }

    onMakeMove = async (index, gameTag) => {
        console.log("GameTag: " + gameTag);
        console.log("index: " + index);
        const squares = this.state.squares;

        // Check if the square is empty
        if (!squares[index]) {
            squares[index] = gameTag;

            this.setState({
                squares: squares,
            });

            this.checkForWinner(squares);


            console.log(this.state.squares);
            console.log(this.props.players.gameId);

            await this.props.updateBoardAction(this.state.squares, this.props.players.gameId);

            console.log('this should not be reached');

            // // Other player's turn to make a move
            // this.turn = (this.turn === 'X') ? 'O' : 'X';

            // Check if there is a winner
            this.checkForWinner(squares)
        }
    };

    render() {
        let status;

        return (
            <div className="game">
                <div className="board">
                    <Board
                        squares={this.state.squares}
                        onClick={index => this.onMakeMove(index, this.state.gameTag, this.onMakeMoveHandler)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateBoardAction: (board, gameId) => dispatch(updateBoardActionHandler(board, gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameMechanics);

