import { Box } from './Box';
import { formatWord } from '../../util/words';
import { MAX_CHARS } from '../../lib/settings';

type CurrentProps = {
  guess: string;
  isErrorAnimating: boolean;
  setIsErrorAnimating: (bool: boolean) => void;
};

export const Current = ({ guess, isErrorAnimating, setIsErrorAnimating }: CurrentProps) => {
  const chars = formatWord(guess);
  const emptyBoxes = new Array(MAX_CHARS - guess.length).fill(0);
  const classname = `${isErrorAnimating ? 'wiggle' : ''} flex justify-center mb-1`

  return (
    <div
      className={classname}
      onAnimationEnd={() => (setIsErrorAnimating(false))}
    >
      {chars.map((char, i) => (
        <Box key={i} char={char} index={i}/>
      ))}
      {emptyBoxes.map((box, i) => (
        <Box key={i} index={i} />
      ))}
    </div>
  );
};
