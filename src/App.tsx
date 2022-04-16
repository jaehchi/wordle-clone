import { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Board } from './components/Board/Board';
import { Keyboard } from './components/Keyboard/Keyboard';
import { Guide } from './components/Modals/Guide';
import { Stats } from './components/Modals/Stats';
import {
  saveGameState,
  loadGameState,
  saveGameStateToGameStats,
} from './util/statistics';
import { GameStatus } from './util/types';
import { MAX_BOARD, MAX_CHARS } from './lib/settings';
import { generateNewSolution } from './util/words';
import './App.css';

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
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [isDark]);

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
    if (currentGuess.length === MAX_CHARS && board.length < MAX_BOARD) {
      setBoard([...board, currentGuess]);
      setCurrentGuess('');

      if (solution === currentGuess) {
        saveGameStateToGameStats(board.length + 1);
        setGameStatus('WON');
      }
    }
  };

  const handleDarkMode = (isDark: boolean) => {
    setIsDark(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const testNewWord = () => {
    setSolution(generateNewSolution());
    setBoard([]);
  };

  console.log(localStorage);
  return (
    <div className='h-screen flex flex-col'>
      <Nav
        isDark={isDark}
        handleStatsOpen={() => setIsStatsOpen(true)}
        handleGuideOpen={() => setIsGuideOpen(true)}
        handleDarkMode={() => handleDarkMode(!isDark)}
      />
      <div onClick={testNewWord}>NEW WORD</div>
      <Board board={board} currentGuess={currentGuess} solution={solution} />
      <Keyboard
        board={board}
        solution={solution}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
      />
      <Guide
        isOpen={isGuideOpen}
        handleClose={() => {
          setIsGuideOpen(false);
        }}
      />
      <Stats
        isOpen={isStatsOpen}
        status={gameStatus}
        currentAttempt={board.length}
        handleClose={() => {
          setIsStatsOpen(false);
        }}
      />
    </div>
  );
};
