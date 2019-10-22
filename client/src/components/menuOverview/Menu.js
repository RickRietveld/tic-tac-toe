import React from 'react';
import * as ReactRedux from 'react-redux';
import ActionButton from "../_componentTools/ActionButton";

export class Menu extends React.Component {

    createGameHandlerHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'CREATE_NEW_GAME'}));
        await this.props.routeProps.history.push('/create');
    };

    joinExistingGameHandler = async () => {
        await this.props.onSubmitMessage(JSON.stringify({message: 'JOIN_EXISTING_GAME'}));
        await this.props.routeProps.history.push('/join');
    };


    render() {
        return <div className="containerForm">
            <ActionButton onClick={this.createGameHandlerHandler} name={"Create a game"}/>
            <ActionButton onClick={this.joinExistingGameHandler} name={"Join existing game"}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Menu);