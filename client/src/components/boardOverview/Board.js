import React from 'react';
import * as ReactRedux from 'react-redux';
import {ListGroup} from "react-bootstrap";
import ListGroupItem from "./boardLogic/ListGroupItem.js"


export class Board extends React.Component {

    render() {

        const playersOverviewList = this.props.players.playerList;

        let loggedInPlayers;

        if (playersOverviewList) {
            loggedInPlayers = playersOverviewList
                .map((player, index) =>
                    <ListGroupItem key={index} token={player.currentTurn} name={player.playerName}/>
                );

        }

        return <>
            <div className="containerPlayers">
                <ListGroup>
                    {loggedInPlayers}
                </ListGroup>
            </div>
            {/*<div id={"container"}>*/}
            {/*    <h1> TicTacToe </h1>*/}
            {/*    <div className={"q"} id={"q0"}></div>*/}
            {/*    <div className={"q"} id={"q1"}></div>*/}
            {/*    <div className={"q"} id={"q2"}></div>*/}
            {/*    <div className={"q"} id={"q3"}></div>*/}
            {/*    <div className={"q"} id={"q4"}></div>*/}
            {/*    <div className={"q"} id={"q5"}></div>*/}
            {/*    <div className={"q"} id={"q6"}></div>*/}
            {/*    <div className={"q"} id={"q7"}></div>*/}
            {/*    <div className={"q"} id={"q8"}></div>*/}
            {/*</div>*/}
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