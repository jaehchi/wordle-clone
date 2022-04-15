import { Filled } from './Filled';
import { Current } from './Current';
import { Empty } from './Empty';
import { MAX_BOARD, MAX_EMPTY_ROWS } from '../../lib/settings';

type BoardProps = {
  board: string[];
  currentGuess: string;
  solution: string;
};

export const Board = ({ board, currentGuess, solution }: BoardProps) => {
  const emptyRows =
    board.length < MAX_EMPTY_ROWS
      ? new Array(MAX_EMPTY_ROWS - board.length).fill(0)
      : [];

  return (
    <div className='pt-24'>
      {board.map((guess, i) => (
        <Filled key={i} guess={guess} solution={solution} />
      ))}
      {board.length < MAX_BOARD && <Current guess={currentGuess} />}
      {emptyRows.map((row, i) => (
        <Empty key={i} />
      ))}
    </div>
  );
};
