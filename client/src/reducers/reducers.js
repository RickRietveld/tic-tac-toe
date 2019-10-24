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
        dispatch(insertPlayerAction(playerName, playerId, gameTag, true, gameId));
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
                currentTurn: true
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
        dispatch(insertPlayerAction(playerName, playerId, gameTag, true, gameId));
        dispatch(fetchPlayerList(gameId))
    }
}

export function fetchPlayerList(gameId) {
    console.log("**********************************");
    console.log("DATA PLAYERS : " + gameId);
    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/playerList/${gameId}`).then((response) => {
            return response.json();
        }).then((data) => {
            dispatch(playerList(data));
            console.log("DATA PLAYERS : " + JSON.stringify(data));
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

export function opponentTurnActionHandler() {
    return {type: "opponentTurnActionHandler"}
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

        case 'opponentTurnActionHandler':
            state.player.currentTurn = !state.player.currentTurn;
            return {...state};

        default:
            return state;
    }
}

//=====================================================================
//    State management for boardOverview
//---------------------------------------------------------------------

export function updateBoardActionHandler(index, gameTag, gameId, board) {
    return (dispatch) => {
        const url = `http://localhost:3000/tictactoe/updateBoard/${gameId}`;
        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                board: board,
                index: index,
                gameTag: gameTag,
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
        dispatch(updateBoardHandler(board));
    }
}

export function fetchBoardUpdate(gameId) {
    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/fetchBoard/${gameId}`).then((response) => {
            return response.json();
        }).then((data) => {
            dispatch(updateBoardHandler(data));
        });
    }
}


export function insertWinnerActionHandler(gameId, gameTag) {
    return () => {
        const url = `http://localhost:3000/tictactoe/setWinner/${gameId}`;
        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                winner: gameTag,
            })
        });
        if (response.error) {
            throw new Error(`HTTP POST request went wrong: got "${response.statusText}" for "${url}"`)
        }
    }
}

export function fetchWinner(gameId) {
    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/fetchWinner/${gameId}`).then((response) => {
            return response.json();
        }).then((data) => {
            dispatch(insertWinnerAction(data.winner));
        });
    }
}

export function fetchTurnCounter(gameId) {
    return async (dispatch) => {
        await fetch(`http://localhost:3000/tictactoe/fetchTurnCounter/${gameId}`).then((response) => {
            return response.json();
        }).then((data) => {
            dispatch(insertTurnCountAction(data.turnCounter));
        });
    }
}

export function updateBoardHandler(board) {
    return {type: "updateBoardHandler", board}
}

export function insertWinnerAction(winnerTag) {
    return {type: "insertWinnerAction", winnerTag}
}

export function insertTurnCountAction(turnCount) {
    return {type: "insertTurnCountAction", turnCount}
}

const initialBoardState = {
    board: ['', '', '', '', '', '', '', '', ''],
    winner: undefined,
    turnCount: 0,
};


function boardReducer(state = initialBoardState, action) {
    switch (action.type) {

        case 'updateBoardHandler':
            state.board = action.board;
            console.log('what is your state... ? ' + JSON.stringify(state.board));
            return {...state};

        case 'insertWinnerAction':
            state.winner = action.winnerTag;
            return {...state};

        case 'insertTurnCountAction':
            state.turnCount = action.turnCount;
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
