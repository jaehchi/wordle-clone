import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Nav } from './components/Nav';
import { Board } from './components/Board/Board';
import { Keyboard } from './components/Keyboard/Keyboard';
import { Guide } from './components/Modals/Guide';
import { Stats } from './components/Modals/Stats';
import {
  saveGameState,
  loadGameState,
  loadGameStats,
  saveGameStateToGameStats,
} from './util/statistics';
import { notifyError, notifyGameOver } from './util/notifications';
import { generateNewSolution, isWordInWordList } from './util/words';
import {
  MAX_BOARD,
  MAX_CHARS,
  GAME_OVER_MS,
  EVAL_MS,
  EVAL_DELAY,
  GAME_WON_DELAY,
} from './lib/settings';
import {
  NOT_ENOUGH_CHARS,
  NOT_IN_WORD_LIST,
  NOT_GAME_OVER,
} from './lib/strings';
import { GameStatus } from './util/types';
import './App.css';

export const App = () => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState(
    () => loadGameState().solution || generateNewSolution()
  );
  const [board, setBoard] = useState(() => {
    const state = loadGameState();
    return loadGameState().solution === solution ? state.board : [];
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    () => loadGameState().gameStatus || 'ONGOING'
  );
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isErrorAnimating, setIsErrorAnimating] = useState(false);
  const [isEvalAnimating, setIsEvalAnimating] = useState(false);
  const [isWinningAnimating, setIsWinningAnimating] = useState(false);
  const [isGameOver, setIsGameOver] = useState(() => gameStatus !== 'ONGOING');

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    if (!loadGameStats().gamesPlayed) setIsGuideOpen(true);
  }, []);

  useEffect(() => {
    saveGameState({
      board,
      solution,
      gameStatus,
      attempts: board.length,
    });
  }, [board, gameStatus, solution]);

  useEffect(() => {
    if (gameStatus !== 'ONGOING') {
      const delay =
        (board.length + 1) * GAME_OVER_MS + MAX_CHARS * GAME_OVER_MS + EVAL_MS;
      alertGameOver(delay);
    }
  }, []);

  const handleDarkMode = (isDark: boolean) => {
    setIsDark(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const alertError = (message: string) => {
    setIsErrorAnimating(true);
    return notifyError(message);
  };

  const alertGameOver = (delay: number) => {
    setTimeout(() => {
      notifyGameOver();
      setIsStatsOpen(true);
    }, delay);
  };

  const getNewWord = () => {
    if (gameStatus === 'ONGOING') return notifyError(NOT_GAME_OVER);

    toast.remove();
    setSolution(generateNewSolution());
    setBoard([]);
    setCurrentGuess('');
    setGameStatus('ONGOING');
    setIsStatsOpen(false);
    setIsEvalAnimating(false);
    setIsWinningAnimating(false);
    setIsGameOver(false);
  };

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_CHARS &&
      gameStatus === 'ONGOING' &&
      !isEvalAnimating
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => setCurrentGuess(currentGuess.slice(0, -1));
  const onEnter = () => {
    if (gameStatus !== 'ONGOING') return;
    if (currentGuess.length < MAX_CHARS) return alertError(NOT_ENOUGH_CHARS);
    if (!isWordInWordList(currentGuess)) return alertError(NOT_IN_WORD_LIST);

    setIsEvalAnimating(true);

    if (currentGuess.length === MAX_CHARS && board.length < MAX_BOARD) {
      setBoard([...board, currentGuess]);
      setCurrentGuess('');

      if (board.length === MAX_BOARD - 1) {
        saveGameStateToGameStats(board.length + 2);
        alertGameOver(EVAL_DELAY);
        setGameStatus('LOSS');
      }

      if (solution === currentGuess) {
        saveGameStateToGameStats(board.length + 1);
        setTimeout(() => setIsWinningAnimating(true), EVAL_DELAY);
        alertGameOver(GAME_WON_DELAY);
        setGameStatus('WON');
      }
    }
    setTimeout(() => setIsEvalAnimating(false), EVAL_DELAY);
  };

  /*
    rewrite generateNewWord logics to prevent gettng the same word.
    add hardmode
  */

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Nav
        isDark={isDark}
        handleStatsOpen={() => setIsStatsOpen(true)}
        handleGuideOpen={() => setIsGuideOpen(true)}
        handleDarkMode={() => handleDarkMode(!isDark)}
      />
      <Toaster containerStyle={{ top: 75 }} />
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
        isEvalAnimating={isEvalAnimating}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
      />
      <Guide isOpen={isGuideOpen} handleClose={() => setIsGuideOpen(false)} />
      <Stats
        isOpen={isStatsOpen}
        status={gameStatus}
        currentAttempt={board.length}
        handleClose={() => setIsStatsOpen(false)}
        getNewWord={getNewWord}
      />
    </div>
  );
};
