import { Box } from './Box';
import { getCharStatus } from '../../util/status';
import { formatWord } from '../../util/words';

type FilledProps = {
  guess: string;
  solution: string;
  isEvalAnimating: boolean;
  isWinningAnimating: boolean;
  isGameOver: boolean;
  rowIndex: number;
  isLastCompletedRow: boolean;
};

export const Filled = ({ guess, solution, isEvalAnimating, isWinningAnimating, isGameOver, rowIndex, isLastCompletedRow }: FilledProps) => {
  const chars = formatWord(guess);
  const statuses = getCharStatus(solution, guess);

  return (
    <div className='flex justify-center mb-1'>
      {chars.map((char, i) => (
        <Box 
          key={i}
          char={char} 
          index={i}
          status={statuses[i]} 
          isEvalAnimating={isEvalAnimating}
          isWinningAnimating={isWinningAnimating}
          isGameOver={isGameOver}
          rowIndex={rowIndex}
          isLastCompletedRow={isLastCompletedRow}
        />
      ))}
    </div>
  );
};
