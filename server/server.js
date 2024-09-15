const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const games = {};

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('createGame', () => {
    const gameId = Math.random().toString(36).substr(2, 9);
    games[gameId] = {
      players: [socket.id],
      board: Array(9).fill(null),
      currentTurn: 'X',
      winner: null,
    };
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
    console.log(`Game created with ID: ${gameId}`);
  });

  socket.on('joinGame', (gameId) => {
    const game = games[gameId];
    if (game && game.players.length < 2) {
      game.players.push(socket.id);
      socket.join(gameId);
      io.to(gameId).emit('startGame', {
        gameId,
        board: game.board,
        currentTurn: game.currentTurn,
        player1: game.players[0],
      });
      console.log(`Player joined game with ID: ${gameId}`);
    } else {
      socket.emit(
        'error',
        'Failed to join game. Either game full or does not exist.'
      );
      console.log(
        `Failed to join game. Either game full or doesn't exist: ${gameId}`
      );
    }
  });

  socket.on('makeMove', ({ gameId, index }) => {
    const game = games[gameId];
    if (
      game &&
      game.board[index] === null &&
      game.players.includes(socket.id)
    ) {
      const playerIndex = game.players.indexOf(socket.id);
      if (
        (game.currentTurn === 'X' && playerIndex === 0) ||
        (game.currentTurn === 'O' && playerIndex === 1)
      ) {
        game.board[index] = game.currentTurn;
        game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';
        const winner = checkWinner(game.board);
        if (winner) {
          game.winner = winner;
          io.to(gameId).emit('gameOver', { board: game.board, winner });
        } else if (game.board.every((cell) => cell !== null)) {
          io.to(gameId).emit('gameOver', { board: game.board, winner: 'Draw' });
        } else {
          io.to(gameId).emit('updateBoard', {
            board: game.board,
            currentTurn: game.currentTurn,
          });
        }
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    for (const [gameId, game] of Object.entries(games)) {
      if (game.players.includes(socket.id)) {
        delete games[gameId];
        io.to(gameId).emit('endGame', 'Player disconnected.');
      }
    }
  });
});

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
