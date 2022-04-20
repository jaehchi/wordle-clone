import { Filled } from './Filled';
import { Current } from './Current';
import { Empty } from './Empty';
import { MAX_BOARD, MAX_EMPTY_ROWS } from '../../lib/settings';

type BoardProps = {
  board: string[];
  currentGuess: string;
  solution: string;
  isErrorAnimating: boolean;
  isEvalAnimating: boolean;
  isWinningAnimating: boolean;
  isGameOver: boolean;
  setIsErrorAnimating: (bool: boolean) => void;
};

export const Board = ({
  board,
  currentGuess,
  solution,
  isErrorAnimating,
  isEvalAnimating,
  isWinningAnimating,
  isGameOver,
  setIsErrorAnimating,
}: BoardProps) => {
  const emptyRows =
    board.length < MAX_EMPTY_ROWS
      ? new Array(MAX_EMPTY_ROWS - board.length).fill(0)
      : [];

  return (
    <div className='pt-3 md:pt-16 lg:pt-24'>
      {board.map((guess, i) => (
        <Filled
          key={i}
          guess={guess}
          solution={solution}
          isEvalAnimating={isEvalAnimating}
          isWinningAnimating={isWinningAnimating}
          isGameOver={isGameOver}
          isLastCompletedRow={board.length - 1 === i}
          rowIndex={i}
        />
      ))}
      {board.length < MAX_BOARD && (
        <Current
          guess={currentGuess}
          isErrorAnimating={isErrorAnimating}
          setIsErrorAnimating={setIsErrorAnimating}
        />
      )}
      {emptyRows.map((row, i) => (
        <Empty key={i} />
      ))}
    </div>
  );
};
