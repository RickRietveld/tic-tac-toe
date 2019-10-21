const WebSocket = require('ws');

const theWebSocketServer = new WebSocket.Server({
    server: theHttpServer,
});

theWebSocketServer.on('connection', websocket => {
    websocket.on('message', (message) => onMessage(message));
    websocket.on('close', () => onClose(websocket))
});

function onMessage(message) {
    console.log(message + ' Message received');

    try {
        sendMessageToPlayers(message)
    } catch (err) {
        console.error("Error occured, probably received non-json data");
        console.error(err.message)
    }
}

function sendMessageToPlayers(message) {
    theWebSocketServer.clients.forEach(function (client) {
        client.send(message);
        console.log(message + ' client sent')

    });
}

function onClose(client) {
    console.log("Connection closed");
    // console.log(client)
}