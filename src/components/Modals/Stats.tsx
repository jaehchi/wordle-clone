import { Modal } from './Modal';
import { DistributionItem } from './DistributionItem';
import { StatItem } from './StatItem';
import { loadGameStats } from '../../util/statistics';
import { GameStatus, GameStats } from '../../util/types';

type StatsProps = {
  isOpen: boolean;
  status: GameStatus;
  currentAttempt: number;
  handleClose: () => void;
};

export const Stats = ({
  isOpen,
  status,
  currentAttempt,
  handleClose,
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
  console.log(status)

  return isOpen ? (
    <Modal width='w-125' handleClose={handleClose}>
      <h1 className='font-medium text-md'>STATISTICS</h1>
      <div className='flex pt-2 text-xs'>
        <StatItem title='Played' value={gamesPlayed} />
        <StatItem title='Win %' value={winPercentage} />
        <StatItem title='Current Streak' value={currentStreak} />
        <StatItem title='Max Streak' value={maxStreak} />
      </div>
      <h1 className='pt-4 font-medium text-md'>GUESS DISTRIBUTION</h1>
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
    </Modal>
  ) : null;
};
