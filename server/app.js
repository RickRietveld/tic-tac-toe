const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const theHttpServer = http.createServer();
const fs = require('fs');
eval(fs.readFileSync('websockets.js') + '');

//---------- Mongoose -------------//

mongoose.connect('mongodb://localhost:27017/tictactoe', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', () => {
    console.log('FAILED to connect to mongoose')
});
db.once('open', () => {
    console.log('connected to mongoose')
});

app.set('json spaces', 3);
app.use(cors());
app.use(compression({threshold: 1}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'client-side')));


const Schema = mongoose.Schema;

let gameSchema = new Schema({
    gameId: Number,
    player: [{
        playerId: Number,
        playerName: String,
        turnCount: Number,
    }],
});

let Room = mongoose.model('Game', gameSchema);

//let teamCollection = mongoose.connection.collection('rooms');
let tictactoe = express.Router();


theHttpServer.on('request', app);
theHttpServer.listen(3000,
    function () {
        console.log("The Server is listening on port 3000.")
    });

app.use("/tictactoe", tictactoe);
