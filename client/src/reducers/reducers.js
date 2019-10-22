import * as Redux from 'redux';


export function createGameActionHandler(playerName, playerId, gameTag, gameId) {
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
                gameTag: gameTag,
                currentTurn: true
            })
        }).catch(() => console.log("error"));
        dispatch(insertPlayerAction(playerName, playerId, gameTag, false, gameId));
    }
}

export function insertPlayerActionHandler(playerName, playerId, gameTag, gameId) {

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
                gameTag: gameTag,
                currentTurn: false
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
        dispatch(insertPlayerAction(playerName, playerId, gameTag, false, gameId));
        dispatch(fetchPlayerList())
    }
}

export function fetchPlayerList() {

    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/playerList`).then((response) => {
            return response.json();
        }).then((data) => {
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

export function insertPlayerAction(playerName, playerId, gameTag, currentTurn, gameId) {
    return {type: "insertPlayerAction", playerName, playerId, gameTag, currentTurn, gameId}
}

const initialPlayerListState = {
    player: {
        playerName: undefined,
        playerId: undefined,
        gameTag: undefined,
        currentTurn: undefined
    },
    playerList: [],
    gameId: undefined,
};

function loginReducer(state = initialPlayerListState, action) {
    switch (action.type) {

        case 'playerList':
            return {...state, playerList: action.playerList};

        case 'insertPlayerAction':
            state.player.playerName = action.playerName;
            state.player.playerId = action.playerId;
            state.player.gameTag = action.gameTag;
            state.player.currentTurn = action.currentTurn;
            state.gameId = action.gameId;
            return {...state};

        default:
            return state;
    }
}

//=====================================================================
//    State management for boardOverview
//---------------------------------------------------------------------

export function updateBoardActionHandler(board, gameId) {

    return (dispatch) => {
        const url = `http://localhost:3000/tictactoe/updateBoard/${gameId}`;
        console.log('i am in hier')
        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                board: board,
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
        dispatch(updateBoardHandler(board));

    }
}

export function fetchBoardUpdate() {

    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/fetchBoard`).then((response) => {
            return response.json();
        }).then((data) => {
            dispatch(updateBoardHandler(data));
        });
    }
}

export function updateBoardHandler(board) {
    console.log('hiero I have update myself I think nugget');
    console.log('nigger 1 ' + board)
    console.log(JSON.stringify('nigger 2 ' + board));
    return {type: "updateBoardHandler", board}
}

const initialBoardState = {
    board: []
};


function boardReducer(state = initialBoardState, action) {
    switch (action.type) {

        case 'updateBoardHandler':
            state.board = action.board;
            return {...state};

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
