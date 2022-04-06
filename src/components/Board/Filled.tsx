import { Box } from "./Box";
import { getCharStatus } from '../../util/status';
import { formatWord } from '../../util/words';

type FilledProps = {
  guess: string;
  solution: string;
};

export const Filled = ({ guess, solution }: FilledProps) => {
  const chars = formatWord(guess);
  const statuses = getCharStatus(solution, guess);
  
  return (
    <div className="flex justify-center mb-1">
      {chars.map((char, i) => (
        <Box key={i} char={char} status={statuses[i]} />
      ))}
    </div>
  );
};
