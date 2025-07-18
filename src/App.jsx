import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Log from "./components/Log";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import WINNING_COMBINATIONS from "./winningCombinations";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

function deriveActivePlayer(gameTurns) {
      let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O';
      return currentPlayer; 
};

function deriveWinner(gameBoard, players) {

  let winner;

    for(const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && secondSquareSymbol === thirdSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
      }
    }

     return winner;

};

function deriveGameBoard(gameTurns) {
    let gameBoard = Array.from({ length: 3 }, () => new Array(3).fill(null));

    for(const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;

}

function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurn => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedBoard = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn
      ]
      return updatedBoard;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={ activePlayer === "X" } onChangeName={ handlePlayerNameChange } />
          <Player initialName={PLAYERS.O} symbol="O" isActive={ activePlayer === "O" } onChangeName={ handlePlayerNameChange } />
        </ol>
        {(winner || hasDraw) && <GameOver winner={ winner } onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={ gameBoard } />
      </div>
      <Log turns={ gameTurns } />
    </main>
  );
}

export default App;
