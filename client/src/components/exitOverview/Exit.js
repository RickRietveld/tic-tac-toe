import React from 'react';
import * as ReactRedux from 'react-redux';
import {fetchWinner} from "../../reducers/reducers";
import ActionButton from "../_componentTools/ActionButton";

export class Exit extends React.Component {

    componentDidMount() {
        // this.props.fetchBoard(this.props.players.gameId);
        this.props.fetchWinner(this.props.players.gameId);
    }

    insertPlayerHandler = async () => {
        await this.props.routeProps.history.push('/');
    };

    displayText = () => {
        if (this.props.board.winner) {
            return <h2>{this.props.board.winner} has won the game!</h2>
        } else {
            return <h2>Game has ended in a draw!</h2>
        }
    };


    render() {
        return <div className="containerForm">
            {this.displayText()}
            <ActionButton onClick={this.insertPlayerHandler} name={"Go back to main menu"}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
        board: state.mainBoard
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWinner: (gameId) => dispatch(fetchWinner(gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Exit);