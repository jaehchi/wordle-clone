import { Box } from "./Box";
import { getCharStatus } from '../../utils/status';

type FilledProps = {
  guess: string;
  solution: string;
};

export const Filled = ({ guess, solution }: FilledProps) => {
  const chars = guess.toUpperCase().split("");
  const statuses = getCharStatus(solution, guess);
  return (
    <div className="flex justify-center mb-1">
      {chars.map((char, i) => (
        <Box key={i} char={char} status={statuses[i]} />
      ))}
    </div>
  );
};
