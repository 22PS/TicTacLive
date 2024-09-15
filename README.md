# TicTacLive
TicTacLive is a real-time multiplayer Tic-Tac-Toe game built using React, Tailwind CSS, Node.js, Express, and Socket.IO. It allows two players to play the classic game over the web by sharing a unique game code.

## Features

- **Real-time Multiplayer:** Play with a friend by sharing a unique game code.
- **Themed UI:** Switch between different themes (Blue, Pink, Black-White) using the context API.
- **Game State Management:** Real-time updates of game state for both players.
- **Win/Draw Detection:** Automatically detects game results win or draw.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Real-time Communication:** Socket.IO

## How to Play

1. **Create a Game**: 
   - Open the game in your browser.
   - Click on the "Create Game" button to start a new game session.
   - A unique game code will be generated. Share this code with a friend.
![image](https://github.com/user-attachments/assets/071d3ceb-8362-4551-92dc-bf84757d96c0)

2. **Join a Game**:
   - If you received a game code from a friend, select the "Join Game" option.
   - Enter the game code to join the ongoing game.
![image](https://github.com/user-attachments/assets/f509ae8a-b3ef-4d4c-a0bf-f68b631c84b1)

3. **Wait for Both Players**:
   - Once both players have joined using the game code, the game will start automatically.
   - If you created the game, you will see a "Waiting for other player to join" message until the other player joins.

4. **Playing the Game**:
   - The game board will be displayed once both players have joined.
   - Click on any of the available squares to place your marker (`X` or `O`).
   - Players take turns placing their markers on the board.
![image](https://github.com/user-attachments/assets/09826f78-2c52-4a2c-8610-1bb127c7499d)

5. **Win or Draw**:
   - The game automatically detects a win, lose, or draw condition.
   - If a player wins or the game ends in a draw, the result will be displayed on a new screen for both players.
![image](https://github.com/user-attachments/assets/367f444f-f533-45eb-bbc2-941af3e97e52)

6. **Theme Switching**:
   - During the game, you can switch between different themes (Blue, Pink, Black-White) using the theme toggler in the game UI.
![image](https://github.com/user-attachments/assets/b697b8e6-40e1-4d28-ae6d-562ad2a451fd)
