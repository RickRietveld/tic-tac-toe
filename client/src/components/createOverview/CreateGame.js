import React from 'react';
import * as ReactRedux from 'react-redux';
import ActionButton from "../_componentTools/ActionButton";
import InsertBox from "../_componentTools/InsertBox";
import {createGameActionHandler} from "../../reducers/reducers";

export class CreateGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
        }
    }

    createGameHandlerHandler = async () => {
        await this.props.createGameAction(this.state.playerName, generateRandomId(), "X", generateRandomId());
        await this.props.onSubmitMessage(JSON.stringify({message: 'USER_REGISTERED'}));
        await this.props.routeProps.history.push('/board');
    };

    handleOnChange(e) {
        this.setState({
            playerName: e.target.value,
        })
    }

    render() {
        return <div className="containerForm">
            <InsertBox onChange={(e) => this.handleOnChange(e)} value={"Choose a name"}/>
            <ActionButton onClick={this.createGameHandlerHandler} name={"Play"}/>
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
        createGameAction: (playerName, playerId, gameTag, gameId) => dispatch(createGameActionHandler(playerName, playerId, gameTag, gameId)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CreateGame);