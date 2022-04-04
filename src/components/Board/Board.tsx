import { Filled } from "./Filled";
import { Current } from "./Current";
import { Empty } from "./Empty";
import { MAX_BOARD_LENGTH, MAX_EMPTY_ROWS } from "../../lib/settings";

type BoardProps = {
  board: string[];
  currentGuess: string;
};

export const Board = ({ board, currentGuess }: BoardProps) => {
  const emptyRows =
    board.length < MAX_EMPTY_ROWS
      ? new Array(MAX_EMPTY_ROWS - board.length).fill(0)
      : [];

  return (
    <div>
      {board.map((guess, i) => (
        <Filled key={i} guess={guess} />
      ))}
      {board.length < MAX_BOARD_LENGTH && <Current guess={currentGuess} />}
      {emptyRows.map((row, i) => (
        <Empty key={i} />
      ))}
    </div>
  );
};