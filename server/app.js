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
    players: [{
        playerId: Number,
        playerName: String,
        gameTag: String,
        currentTurn: Boolean
    }],
    gameProgress: []
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
        gameProgress: []
    });

    await createGame.save(function (err) {
        if (err) return res.status(500).send(err);
    });

    // await gameCollection.find({"games.currentTurn": {$ne: null}}).toArray(function (err, result) {
    //     if (err) throw err;
    //     res.json(result);
    // });
});

tictactoe.get('/playerList', async function (request, response) {
    await gameCollection.find({"players.playerName": {$ne: null}}).toArray(function (err, result) {
        if (err) throw err;
        response.json(result);
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
        console.log('went here');
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(data);
    });
});

tictactoe.get('/playerList', async function (request, response) {
    await gameCollection.find({"players.playerId": {$ne: null}}).toArray(function (err, result) {
        if (err) throw err;
        response.json(result);
    });
});

theHttpServer.on('request', app);
theHttpServer.listen(3000,
    function () {
        console.log("The Server is listening on port 3000.")
    });

app.use("/tictactoe", tictactoe);
