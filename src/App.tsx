import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigureComponent from "./components/LostFigureComponent";
import TimerComponent from "./components/TimerComponent";

function App() {
    const [board, setBoard] = useState(new Board())
    const [ whitePlayer, setWhitePlayer ] = useState(new Player(Colors.WHITE))
    const [ blackPlayer, setBlackPlayer ] = useState(new Player(Colors.BLACK))
    const [ currentPlayer, setCurrentPlayer ] = useState<Player | null>(null)
    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    const [ playerWin, setPlayerWin ] = useState('')

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
    <div className="App">
        <TimerComponent
            currentPlayer={currentPlayer}
            restart={restart}
            setPlayerWin={setPlayerWin}
        />
        <BoardComponent
            playerWin={playerWin}
            board={board}
            setBoard={setBoard}
            swapPlayer={swapPlayer}
            currentPlayer={currentPlayer}
        />
        <div>
            <LostFigureComponent
                title="Черные фигуры"
                figures={board.lostBlackFigures}
            />
            <LostFigureComponent
                title="Белые фигуры"
                figures={board.lostWhiteFigures}
            />
        </div>
    </div>
  );
}

export default App;
