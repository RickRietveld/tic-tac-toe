import * as Redux from 'redux';

export function insertPlayerActionHandler(playerName) {

    return insertPlayerAction(playerName);
}

//=====================================================================
//    State management for loginOverview
//---------------------------------------------------------------------

// Action Creators:
export function playerList([playerList]) {
    return {type: "playerList", playerList}
}

export function insertPlayerAction(playerName) {
    return {type: "insertPlayerAction", playerName}
}

const initialPlayerListState = {
    playerList: [],
};

function loginReducer(state = initialPlayerListState, action) {
    switch (action.type) {

        case 'playerList':
            return {...state, playerList: action.playerList};

        case 'insertPlayerAction':
            state.playerList.push(action.playerName);
            return {...state, insertPlayer: action.playerName};

        default:
            return state;
    }
}

//=====================================================================
//    State management for boardOverview
//---------------------------------------------------------------------

const boardInitialState = {};

function boardReducer(state = boardInitialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

//===========================================================================
//  Combining the reducers and their state into a single reducer managing
//  a single state
//---------------------------------------------------------------------------

export const mainReducer = Redux.combineReducers({
    newPlayer: loginReducer,
    mainBoard: boardReducer,
});
