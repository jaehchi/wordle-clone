import toast from 'react-hot-toast';
import { loadGameState } from './statistics';
import { GameState } from './types';
import { WINNING_MESSAGES } from '../lib/strings';

export const notifyError = (message: string) => {
  toast.remove();
  const classname = 'bg-red-500 px-6 py-3 flex justify-center text-white font-bold tracking-wider rounded-lg';
  const options = { duration: 1000 };
  
  toast.custom((t) => <div className={classname}>{message}</div>, options);
};

export const notifyGameOver = () => {
  toast.remove();
  const { gameStatus, attempts, solution }: GameState = loadGameState();
  const isGameWon = gameStatus === 'WON';
  const classname = 'bg-black px-6 py-3 flex justify-center text-white font-bold tracking-wider rounded-lg';
  const options = { duration: isGameWon ? 10000 : Infinity };
  const message = isGameWon ?  WINNING_MESSAGES[attempts - 1] : solution?.toUpperCase();

  toast.custom((t) => <div className={classname}>{message}</div>, options);
};
