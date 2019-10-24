import React from 'react';
import * as ReactRedux from 'react-redux';
import Square from "./Square";

export class Board extends React.Component {

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
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {

        return <>
            <div>{this.createBoard(3, 3)}</div>
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