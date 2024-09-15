import React from 'react';

const themeClass = {
  themeBlue: 'border-blue-800 text-black',
  themePink: 'border-pink-700 text-black',
  themeBlackWhite: 'border-gray-100 text-white',
};

const bgThemeClass = {
  themeBlue: 'bg-blue-400',
  themePink: 'bg-pink-400',
  themeBlackWhite: 'bg-gray-700',
};
const Board = ({ board, onSquareClick, theme }) => {
  return (
    <div className="grid grid-cols-3 gap-1 w-64 h-64">
      {board.map((value, index) => (
        <button
          key={index}
          onClick={() => onSquareClick(index)}
          className={`w-20 h-20 text-4xl flex items-center justify-center border-4  ${
            themeClass[theme]
          } font-medium
          ${value === 'X' ? bgThemeClass[theme] : themeClass[theme]}
            
          `}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Board;
