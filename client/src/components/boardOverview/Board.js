import React from 'react';
import * as ReactRedux from 'react-redux';
import Square from "./boardLogic/Square";


export class Board extends React.Component {

    // Create the 3 x 3 board
    createBoard(row, col) {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(this.renderSquare(cellCounter++));
            }
            board.push(<div key={i} className="board-row">{columns}</div>);
        }

        return board;
    }

    renderSquare(i) {
        console.log("render square called");
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        // const playersOverviewList = this.props.players.playerList;
        //
        // let loggedInPlayers;
        //
        // if (playersOverviewList) {
        //     loggedInPlayers = playersOverviewList
        //         .map((player, index) =>
        //             <ListGroupItem key={index} token={player.currentTurn} name={player.playerName}/>
        //         )
        //
        // }

        return <>
            {/*<div className="containerPlayers">*/}
            {/*    <ListGroup>*/}
            {/*        {loggedInPlayers}*/}
            {/*    </ListGroup>*/}
            {/*</div>*/}
            <div>{this.createBoard(3, 3)}</div>
            ;
        </>
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Board);