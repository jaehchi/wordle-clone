import { Box } from "./Box";
import { MAX_CHARS } from "../../lib/settings";
type CurrentProps = {
  guess: string;
};

export const Current = ({ guess }: CurrentProps) => {
  const chars = guess.toUpperCase().split("");
  
  const emptyBoxes = new Array(MAX_CHARS - guess.length).fill(0);
  return (
    <div className="flex justify-center mb-1">
      {chars.map((char, i) => (
        <Box key={i} char={char} />
      ))}
      {emptyBoxes.map((box, i) => (
        <Box key={i} />
      ))}
    </div>
  );
};
