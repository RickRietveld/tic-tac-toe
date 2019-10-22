import React, {Component} from 'react';
import Board from './Board';
//import './Style.css';
import GameMechanics from "./boardLogic/GameMechanics";

export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            piece: '',
            isPlaying: true,
            isRoomCreator: false,
            isDisabled: false,
            myTurn: false,
        };

        this.gameChannel = null;
    }


    render() {
        return (
            <div>
                <div className="title">
                    <p>Tic Tac Toe</p>
                </div>

                {
                    !this.state.isPlaying && //currentTurn = false
                    <div className="game">
                        <div className="board">
                            <Board
                                squares={0}
                                onClick={index => null}
                            />
                        </div>
                    </div>
                }
                {
                    this.state.isPlaying && //currentTurn = true
                    <GameMechanics
                        gameChannel={this.gameChannel}
                        piece={this.state.piece}
                        isRoomCreator={this.state.isRoomCreator}
                        myTurn={this.state.myTurn}
                    />
                }
            </div>
        );
    }
}

export default Game;
