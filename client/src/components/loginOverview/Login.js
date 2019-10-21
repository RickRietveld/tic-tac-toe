import React from 'react';
import * as ReactRedux from 'react-redux';
import ActionButton from "../_componentTools/ActionButton";
import InsertBox from "../_componentTools/InsertBox";
import {insertPlayerActionHandler} from "../../reducers/reducers";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
        }
    }

    insertPlayerHandler = async () => {
        await this.props.insertPlayerAction(this.state.playerName);
        await this.props.onSubmitMessage(JSON.stringify({message: 'USER_REGISTERED'}));
        await this.props.routeProps.history.push('/board');
    };

    handleOnChange(e) {
        this.setState({
            playerName: e.target.value,
        })
    }

    render() {
        return
    <
        div
        className = "panel panel-default" >
            < div
        className = "panel-body" >
            < InsertBox
        onChange = {(e)
    =>
        this.handleOnChange(e)
    }
        name = {"Choose a name"}
        />
        < /div>
        < ActionButton
        onClick = {this.insertPlayerHandler}
        name = {"Join tic-tac-toe"}
        />
        < /div>
    }
}

function mapStateToProps(state) {
    return {
        newPlayer: state.newPlayer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertPlayerAction: (playerName) => dispatch(insertPlayerActionHandler(playerName)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Login);