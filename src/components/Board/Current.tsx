import { Box } from './Box';
import { formatWord } from '../../util/words';
import { MAX_CHARS } from '../../lib/settings';

type CurrentProps = {
  guess: string;
};

export const Current = ({ guess }: CurrentProps) => {
  const chars = formatWord(guess);
  const emptyBoxes = new Array(MAX_CHARS - guess.length).fill(0);

  return (
    <div className='flex justify-center mb-1'>
      {chars.map((char, i) => (
        <Box key={i} char={char} />
      ))}
      {emptyBoxes.map((box, i) => (
        <Box key={i} />
      ))}
    </div>
  );
};
