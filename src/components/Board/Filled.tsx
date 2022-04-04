import { Box } from "./Box";

type FilledProps = {
  guess: string;
};

export const Filled = ({ guess }: FilledProps) => {
  const chars = guess.toUpperCase().split("");
  return (
    <div className="flex justify-center mb-1">
      {chars.map((char, i) => (
        <Box key={i} char={char} />
      ))}
    </div>
  );
};
