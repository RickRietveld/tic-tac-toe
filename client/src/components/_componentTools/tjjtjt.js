// import React from 'react';
// import Board from './boardLogic/Board';
// import * as ReactRedux from "react-redux";
// import {
//     insertWinnerActionHandler,
//     opponentTurnActionHandler,
//     updateBoardActionHandler
// } from "../../reducers/reducers";
//
// import Pusher from 'pusher-js';
//
// let pusher = new Pusher('8787ac6d77c8d767b723', {
//     cluster: 'eu',
//     forceTLS: true
// });
//
// class Game extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(9).fill(''),
//             gameTag: this.props.players.player.gameTag,
//             currentTurn: this.props.players.player.currentTurn,
//         };
//
//         this.counter = 0;
//     }
//
//     onMakeMoveHandler = async () => {
//         await this.props.onSubmitMessage(JSON.stringify({message: 'MOVE_SET_BY_PLAYER'}));
//     };
//
//     onAnnounceWinnerHandler = async () => {
//         await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_WINNER'}));
//     }
//
//     onAnnounceDrawHandler = async () => {
//         await this.props.onSubmitMessage(JSON.stringify({message: 'ANNOUNCE_DRAW'}));
//     }
//
//     componentDidMount() {
//         const gameId = this.props.players.gameId;
//
//         const channel = pusher.subscribe(`game-${gameId}`);
//         channel.bind('board-updated', () => {
//             this._refreshGame();
//         });
//     }
//
//     componentWillUnmount() {
//         const gameId = this.props.players.gameId;
//         pusher.unsubscribe(`game-${gameId}`);
//     }
//
//     _refreshGame() {
//         // this.takeTurns();
//         // this.checkForTurn();
//         this.setState({
//             squares: this.props.board.board.gameProgress,
//         });
//     }
//
//
//     // takeTurns =  () => {
//     //     console.log('HEYA IM SWITCHING TURNS!');
//     //     console.log('NR1: ' + this.props.players.player.currentTurn)
//     //     this.props.opponentTurnAction();
//     //
//     //     this.setState({
//     //         currentTurn: !this.state.currentTurn,
//     //     });
//     //
//     //     console.log('NR2: ' + this.props.players.player.currentTurn)
//     // };
//     //
//     // checkForTurn = () => {
//     //     let myElement = document.querySelector("#pointer");
//     //
//     //     if(this.state.currentTurn) {
//     //         myElement.style.pointerEvents = "auto";
//     //     } else {
//     //         myElement.style.pointerEvents = "none";
//     //     }
//     //
//     // };
//
//
//     checkForWinner = async (squares) => {
//         // Possible winning combinations
//         const possibleCombinations = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ];
//
//         // Iterate every combination to see if there is a match
//         for (let i = 0; i < possibleCombinations.length; i += 1) {
//             const [a, b, c] = possibleCombinations[i];
//             if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//                 await this.props.insertWinnerAction(this.props.players.gameId, squares[a]);
//                 setTimeout(this.onAnnounceWinnerHandler, 1000);
//                 return;
//             }
//         }
//
//         // Check if the game ends in a draw
//         // this.counter++;
//         // The board is filled up and there is no winner
//         for(let i=0; i<this.props.board.board.length; i++){
//             console.log('stringvalue = ' + this.props.board.board[i].stringValue);
//             if(this.props.board.board[i].stringValue !== undefined){
//                 this.counter++;
//                 if (this.counter === 9) {
//                     this.onAnnounceDrawHandler();
//                 }
//             }
//         }
//         console.log(this.counter);
//         //console.log('BOARD length = ' + this.props.board.board.length)
//     };
//
//     onMakeMove = async (index, gameTag) => {
//         const squares = this.state.squares;
//         // this.takeTurns();
//         // this.checkForTurn();
//
//         // Check if the square is empty
//         if (!squares[index]) {
//             squares[index] = gameTag;
//
//             await this.props.updateBoardAction(index, this.state.gameTag, this.props.players.gameId, squares);
//
//             await this.onMakeMoveHandler();
//
//             this.checkForWinner(squares);
//         } else {
//             console.log('taken already')
//         }
//     };
//
//     render() {
//         return (<>
//                 <div className="title">
//                     <p>Tic Tac Toe</p>
//                 </div>
//                 <div id="pointer">
//                     <div className="game">
//                         <div className="board">
//                             <Board
//                                 squares={this.state.squares}
//                                 onClick={index => this.onMakeMove(index, this.state.gameTag)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         players: state.players,
//         board: state.mainBoard,
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         updateBoardAction: (index, gameTag, board, gameId) => dispatch(updateBoardActionHandler(index, gameTag, board, gameId)),
//         insertWinnerAction: (gameId, winnerTag) => dispatch(insertWinnerActionHandler(gameId, winnerTag)),
//         //opponentTurnAction: () => dispatch(opponentTurnActionHandler()),
//     }
// }
//
// export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Game);
//
