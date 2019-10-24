import React from 'react';
import * as ReactRedux from 'react-redux';
import ActionButton from "../_componentTools/ActionButton";
import InsertBox from "../_componentTools/InsertBox";
import {insertPlayerActionHandler} from "../../reducers/reducers";

export class JoinGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            gameId: '',
        }
    }

    insertPlayerHandler = async () => {
        await this.props.insertPlayerAction(this.state.playerName, generateRandomId(), "O", this.state.gameId);
        await this.props.onSubmitMessage(JSON.stringify({message: 'USER_REGISTERED'}));
        await this.props.routeProps.history.push('/game');
    };

    handleOnNameChange(e) {
        this.setState({
            playerName: e.target.value,
        })
    }

    handleOnGameIdChange(e) {
        this.setState({
            gameId: e.target.value,
        })
    }

    render() {
        return <div className="containerForm">
            <InsertBox onChange={(e) => this.handleOnNameChange(e)} value={"Choose a name"}/>
            <InsertBox onChange={(e) => this.handleOnGameIdChange(e)} value={"Insert game ID"}/>
            <ActionButton onClick={this.insertPlayerHandler} name={"Join existing game"}/>
        </div>
    }
}

export function generateRandomId() {
    return Math.floor(100000 + Math.random() * 900000);
}


function mapStateToProps(state) {
    return {
        players: state.players,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertPlayerAction: (playerName, playerId, gameTag, gameId) => dispatch(insertPlayerActionHandler(playerName, playerId, gameTag, gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(JoinGame);