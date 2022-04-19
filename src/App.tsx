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
import { generateNewSolution, isWordInWordList } from './util/words';
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
  const [isErrorAnimating, setIsErrorAnimating] = useState(false);
  const [isEvalAnimating, setIsEvalAnimating] = useState(false);
  const [isWinningAnimating, setIsWinningAnimating] = useState(false);
  const [isGameOver, setIsGameOver] = useState(() => {
    return gameStatus === 'WON';
  });
  
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
  
  const handleDarkMode = (isDark: boolean) => {
    setIsDark(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const testNewWord = () => {
    setSolution(generateNewSolution());
    setBoard([]);
    setCurrentGuess('');
    setGameStatus('ONGOING');
    setIsEvalAnimating(false);
    setIsWinningAnimating(false);
    setIsGameOver(false);
  };

  const onChar = (value: string) => {
    if (currentGuess.length < MAX_CHARS && gameStatus === 'ONGOING' && !isEvalAnimating) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (gameStatus !== 'ONGOING') return;
    if (currentGuess.length < MAX_CHARS) {
      return setIsErrorAnimating(true);
    }
    if (!isWordInWordList(currentGuess)) {
      return setIsErrorAnimating(true);
    }

    setIsEvalAnimating(true);

    // if currentGuess is less  than max word length return
    // if word is noot in wordlist list return
    if (currentGuess.length === MAX_CHARS && board.length < MAX_BOARD) {
      setBoard([...board, currentGuess]);
      setCurrentGuess('');

      if (solution === currentGuess) {
        saveGameStateToGameStats(board.length + 1);
        setTimeout(() => {
          setIsWinningAnimating(true);
        }, 2500);
        setGameStatus('WON');
      }
    }


    setTimeout(() => {
      setIsEvalAnimating(false);
    }, 2500);
  };

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Nav
        isDark={isDark}
        handleStatsOpen={() => setIsStatsOpen(true)}
        handleGuideOpen={() => setIsGuideOpen(true)}
        handleDarkMode={() => handleDarkMode(!isDark)}
      />
      <div onClick={() => {testNewWord()}}>{solution}</div>
      <Board 
        board={board} 
        currentGuess={currentGuess} 
        solution={solution}
        isErrorAnimating={isErrorAnimating}
        isEvalAnimating={isEvalAnimating}
        isWinningAnimating={isWinningAnimating}
        isGameOver={isGameOver}
        setIsErrorAnimating={setIsErrorAnimating}
      />
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
        handleClose={() => setIsStatsOpen(false)}
      />
    </div>
  );
};
