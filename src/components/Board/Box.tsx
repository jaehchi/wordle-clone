import classnames from 'classnames';
import { KeyStatus } from '../../util/types';

type BoxProps = {
  char?: string;
  index: number;
  status?: KeyStatus;
  isEvalAnimating?: boolean;
  isWinningAnimating?: boolean;
  isGameOver?: boolean;
  rowIndex?: number;
  isLastCompletedRow?: boolean;
};

export const Box = ({ char, index, status, isEvalAnimating, isWinningAnimating, isGameOver, rowIndex, isLastCompletedRow}: BoxProps) => {
  const winningDelay =  isWinningAnimating ? `${200 * index}ms` : '0';
  const evaluatingDelay = isEvalAnimating ? `${500 * index}ms` : '0';
  const gameOverDelay = isGameOver && rowIndex !== undefined ? `${(100 * rowIndex) + (100 * index)}ms` : '0';
  const animationDelay = isEvalAnimating ? evaluatingDelay : isWinningAnimating ? winningDelay : gameOverDelay;

  const classname = classnames(
    'w-16 h-16 mx-0.5 border-2 flex justify-center items-center font-bold text-4xl',
    {
      'yay': isWinningAnimating && isLastCompletedRow,
      'flip' : isEvalAnimating && isLastCompletedRow || isGameOver,
      'border-slate-400 dark:border-frost': !char && !status,
      'fill border-polar-100 dark:border-white': char && !status,
      'border-green-600 bg-green-600 text-white': status === 'correct',
      'border-yellow-500 bg-yellow-500 text-white': status === 'present',
      'border-polar-100 bg-polar-100 text-white': status === 'absent',
    }
  );
  
  return (
    <div className='flex justify-center mb-1'>
      <div className={classname} style={{ animationDelay }}>{char}</div>
    </div>
  );
};
