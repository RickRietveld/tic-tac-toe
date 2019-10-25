
# Tic Tac Toe Online Multiplayer

Tic Tac Toe Online Multiplayer made with React Redux and Express NodeJS to create the Server. The game makes use of websockets, so that the multiplayer part is realtime. It communicate with a mongo database to save game data and to be able to create multiple match rooms.

## How to deploy:

- Create a mongoDB collection called 'tictactoe' and run it on 'localhost:27017'
- Run npm install for both client and server. 
- Launch server 'node app.js' and run it on port 3000. 
- Launch client 1 'npm start'.
- Launch client 2 'npm start'.

### Future todo list:

- Add turn based structure. 
- Add match Id validation. 
- Add max player per match validation. 
