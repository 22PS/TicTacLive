import React, { useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import Board from './components/Board';
import ThemeToggler from './components/ThemeToggler';
import { ThemeContext } from './context/ThemeContext';

const socket = io('http://localhost:5000');

function App() {
  const [gameId, setGameId] = useState('');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('X');
  const [message, setMessage] = useState('');
  const [player1Id, setPlayer1Id] = useState('');
  const [isPlayer1, setIsPlayer1] = useState(false);
  const { theme } = useContext(ThemeContext);

  const themeClass = {
    themeBlue: 'bg-blue-200 text-blue-950',
    themePink: 'bg-pink-200 text-pink-950',
    themeBlackWhite: 'bg-gray-950 text-white',
  };
  useEffect(() => {
    socket.on('gameCreated', (newGameId) => {
      setGameId(newGameId);
      setIsWaiting(true);
      setMessage(`Game created successfully !!`);
    });

    socket.on('startGame', ({ gameId, board, currentTurn, player1 }) => {
      setIsGameStarted(true);
      setIsWaiting(false);
      setBoard(board);
      setCurrentTurn(currentTurn);
      setPlayer1Id(player1);
      setIsPlayer1(socket.id === player1);
      setMessage(
        `Game started. Current turn: ${
          currentTurn === 'X' ? 'Player 1' : 'Player 2'
        }`
      );
    });

    socket.on('updateBoard', ({ board, currentTurn }) => {
      setBoard(board);
      setCurrentTurn(currentTurn);
      setMessage(
        `Current turn: ${currentTurn === 'X' ? 'Player 1' : 'Player 2'}`
      );
    });

    socket.on('gameOver', ({ board, winner }) => {
      setBoard(board);
      setIsGameStarted(false);
      setMessage(
        winner === 'Draw'
          ? 'Game Drawn!'
          : `Winner: ${winner === 'X' ? 'Player 1' : 'Player 2'}`
      );
    });

    socket.on('endGame', (msg) => {
      setIsGameStarted(false);
      setIsWaiting(false);
      setMessage(msg);
    });

    socket.on('error', (errorMessage) => {
      setMessage(errorMessage);
    });

    return () => {
      socket.off('gameCreated');
      socket.off('startGame');
      socket.off('updateBoard');
      socket.off('gameOver');
      socket.off('endGame');
      socket.off('error');
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameId).then(alert('Copied to clipboard!!'));
  };

  const handleCreateGame = () => {
    socket.emit('createGame');
  };

  const handleJoinGame = () => {
    if (gameId) {
      socket.emit('joinGame', gameId);
    }
  };

  const handleSquareClick = (index) => {
    if (isGameStarted && board[index] === null) {
      socket.emit('makeMove', { gameId, index });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${themeClass[theme]}`}
    >
      {isGameStarted && (
        <div className="flex text-4xl font-bold mb-10">
          <span>{player1Id === socket.id ? 'Player 1' : 'Player 2'}</span>
        </div>
      )}
      <ThemeToggler />

      <div className="mb-4 text-xl">{message}</div>
      {!isGameStarted ? (
        <div>
          {isWaiting ? (
            <div className="text-xl">
              <p>Waiting for another player to join...</p>
              <p>
                Share this Game ID:{' '}
                <button
                  onClick={copyToClipboard}
                  className="shadow-md shadow-slate-100 m-1 font-medium text-2xl"
                >
                  {gameId}
                </button>
              </p>
            </div>
          ) : (
            <div>
              <button
                onClick={handleCreateGame}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create Game
              </button>
              <input
                type="text"
                placeholder="Enter Game ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="border p-2 mx-2 text-black"
              />
              <button
                onClick={handleJoinGame}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Join Game
              </button>
            </div>
          )}
        </div>
      ) : (
        <Board board={board} onSquareClick={handleSquareClick} theme={theme} />
      )}
    </div>
  );
}

export default App;
