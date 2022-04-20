import { Modal } from './Modal';
import { DistributionItem } from './DistributionItem';
import { StatItem } from './StatItem';
import { loadGameStats } from '../../util/statistics';
import { GameStatus, GameStats } from '../../util/types';
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION,
  GAME_PLAYED,
  WIN_PERCENTAGE,
  CURRENT_STREAK,
  MAX_STREAK,
  NEXT_WORDLE,
} from '../../lib/strings';

type StatsProps = {
  isOpen: boolean;
  status: GameStatus;
  currentAttempt: number;
  handleClose: () => void;
  getNewWord: () => void;
};

export const Stats = ({
  isOpen,
  status,
  currentAttempt,
  handleClose,
  getNewWord,
}: StatsProps) => {
  const {
    gamesPlayed,
    winPercentage,
    currentStreak,
    maxStreak,
    spread,
  }: GameStats = loadGameStats();
  const distribution = Object.keys(spread);
  const max = Math.max(...Object.values(spread));

  return isOpen ? (
    <Modal width='w-125' handleClose={handleClose}>
      <h1 className='font-medium text-md'>{STATISTICS_TITLE}</h1>
      <div className='flex pt-2 text-xs'>
        <StatItem title={GAME_PLAYED} value={gamesPlayed} />
        <StatItem title={WIN_PERCENTAGE} value={winPercentage} />
        <StatItem title={CURRENT_STREAK} value={currentStreak} />
        <StatItem title={MAX_STREAK} value={maxStreak} />
      </div>
      <h1 className='pt-4 font-medium text-md'>{GUESS_DISTRIBUTION}</h1>
      <div className='w-11/12 lg:w-100'>
        {distribution.map((item, i) => (
          <DistributionItem
            key={i}
            status={status}
            value={spread[item]}
            currentAttempt={currentAttempt}
            attempt={Number(item)}
            max={max}
          />
        ))}
      </div>
      <div className='mt-2 w-full flex justify-center'>
        <div className='w-6/12'>
          <button
            className='w-full h-10 mt-2 bg-blue-500 flex justify-center items-center text-white rounded-md'
            onClick={getNewWord}>
            {NEXT_WORDLE}
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};
