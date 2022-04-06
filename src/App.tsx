import { useState, useEffect } from "react";
import { Board } from "./components/Board/Board";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { GameStatus, saveGameState, loadGameState, loadGameStats ,saveGameStateToGameStats } from "./util/statistics";
import { MAX_BOARD, MAX_CHARS } from "./lib/settings";
import { generateNewSolution } from './util/words';

export const App = () => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState(() => {
    return loadGameState().solution || generateNewSolution();
  });
  const [board, setBoard] = useState(() => {
    const state = loadGameState();
    return state.solution === solution ? state.board : [];
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>(() => {
    return loadGameState().gameStatus || 'ONGOING';
  });
  
  useEffect(() => {
    saveGameState({
      board,
      solution,
      gameStatus,
      attempts: board.length,
    });
  }, [board, gameStatus, solution]);

  const onChar = (value: string) => {
    if (currentGuess.length < MAX_CHARS && gameStatus === 'ONGOING') {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    // if currentGuess is less  than max word length return
    // if word is noot in wordlist list return
    if (
      currentGuess.length === MAX_CHARS &&
      board.length < MAX_BOARD

    ) {
      setBoard([...board, currentGuess]);
      setCurrentGuess("");
    }
  };

  const testNewWord = () => {
    setSolution(generateNewSolution());
    setBoard([]);
  }
  return (
    <div className="h-screen flex flex-col">
      <div onClick={testNewWord}>NEW WORD</div>
      <Board board={board} currentGuess={currentGuess} solution={solution} />
      <Keyboard board={board} solution={solution} onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
    </div>
  );
};
