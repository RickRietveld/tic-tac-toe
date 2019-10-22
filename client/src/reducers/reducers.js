import * as Redux from 'redux';


export function createGameActionHandler(playerName, playerId, gameId) {
    return async (dispatch) => {
        const url = `http://localhost:3000/tictactoe/createGame`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerName: playerName,
                playerId: playerId,
                gameId: gameId,
                gameTag: "X",
                currentTurn: true
            })
        }).catch(() => console.log("error"));
        dispatch(insertPlayerAction(playerName, playerId, false));
    }
}

export function insertPlayerActionHandler(playerName, playerId, gameId) {

    return async dispatch => {
        const url = `http://localhost:3000/tictactoe/joinMatch/${gameId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerId: playerId,
                playerName: playerName,
                gameTag: "O",
                currentTurn: false
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
        dispatch(insertPlayerAction(playerName, playerId, false));
        dispatch(fetchPlayerList())
    }
}

export function fetchPlayerList() {

    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/playerList`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("HOIOIOIOIO" + JSON.stringify(data));
            dispatch(playerList(data));
        });
    }
}

//=====================================================================
//    State management for loginOverview
//---------------------------------------------------------------------

// Action Creators:
export function playerList(playerList) {
    return {type: "playerList", playerList}
}

export function insertPlayerAction(playerName, playerId, currentTurn) {
    return {type: "insertPlayerAction", playerName, playerId, currentTurn}
}

const initialPlayerListState = {
    player: [{
        playerName: undefined,
        playerId: undefined,
        currentTurn: undefined
    }],
    playerList: [],
};

function loginReducer(state = initialPlayerListState, action) {
    switch (action.type) {

        case 'playerList':
            return {...state, playerList: action.playerList};

        case 'insertPlayerAction':
            state.player[0].playerName = action.playerName;
            state.player[0].playerId = action.playerId;
            state.player[0].currentTurn = action.currentTurn;
            return {...state};

        default:
            return state;
    }
}

//=====================================================================
//    State management for boardOverview
//---------------------------------------------------------------------

const initialBoardState = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
};


function boardReducer(state = initialBoardState, action) {
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
    players: loginReducer,
    mainBoard: boardReducer,
});
