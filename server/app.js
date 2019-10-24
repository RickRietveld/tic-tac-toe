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


let Pusher = require('pusher');

let pusher = new Pusher({
    appId: '886596',
    key: '8787ac6d77c8d767b723',
    secret: '955e111ab85f7f9e2d00',
    cluster: 'eu',
    encrypted: true
});

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
    players: [{
        playerId: Number,
        playerName: String,
        gameTag: String,
        currentTurn: Boolean
    }],
    gameProgress: [],
    winner: String,
    turnCounter: Number,
});

let Game = mongoose.model('Game', gameSchema);

let gameCollection = mongoose.connection.collection('games');
let tictactoe = express.Router();

tictactoe.post('/createGame', async function (req, res) {
    const createGame = new Game({
        players: [{
            playerId: req.body.playerId,
            playerName: req.body.playerName,
            gameTag: req.body.gameTag,
            currentTurn: req.body.currentTurn
        }],
        gameId: req.body.gameId,
        gameProgress: ['', '', '', '', '', '', '', '', ''],
        turnCounter: 0
    });

    await createGame.save(function (err) {
        if (err) return res.status(500).send(err);
    });

});

tictactoe.put('/setWinner/:gameId', function (req, res) {

    Game.findOneAndUpdate({"gameId": req.params.gameId}, {
        $set: {
            "winner": req.body.winner
        }
    }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(data);
    });
});

tictactoe.put('/joinMatch/:gameId', function (req, res) {
    Game.findOneAndUpdate({"gameId": req.params.gameId}, {
        "$push": {
            "players": [{
                playerId: req.body.playerId,
                playerName: req.body.playerName,
                gameTag: req.body.gameTag,
                currentTurn: req.body.currentTurn
            }]
        }
    }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(data);
    });
});


tictactoe.put('/updateBoard/:gameId', function (req, res) {

    const query = 'gameProgress.' + req.body.index;

    Game.findOneAndUpdate({"gameId": req.params.gameId}, {
        $set: {
            [query]: req.body.gameTag
        },
        $inc: {
            "turnCounter": 1
        }
    }, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(data);
    });
});


tictactoe.get('/fetchBoard/:gameId', async function (req, res) {
    const gameId = req.params.gameId;
    await Game.findOne({"gameId": gameId},
        'gameProgress', (function (err, data) {

        if (err) throw err;
            res.json(data);
            pusher.trigger('game-' + gameId, 'board-updated', {});
    }));
});

tictactoe.get('/fetchWinner/:gameId', async function (req, res) {
    const gameId = req.params.gameId;
    await Game.findOne({"gameId": gameId},
        'winner', (function (err, data) {
            if (err) throw err;
            res.json(data);
        }));
});

tictactoe.get('/fetchTurnCounter/:gameId', async function (req, res) {
    const gameId = req.params.gameId;
    await Game.findOne({"gameId": gameId},
        'turnCounter', (function (err, data) {
            if (err) throw err;
            res.json(data);
        }));
});

tictactoe.get('/gameChecker/:roomId', async function (req, res) {
    const gameId = req.params.gameId;
    await Game.findOne({"gameId": gameId}, (function (err, data) {
        if (data == null) {
            return res.status(500).send(err);
        } else {
            res.json(data);
        }
    }));
});


theHttpServer.on('request', app);
theHttpServer.listen(3000,
    function () {
        console.log("The Server is listening on port 3000.")
    });

app.use("/tictactoe", tictactoe);
