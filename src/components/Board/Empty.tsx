import { Box } from "./Box";
import { MAX_WORD_LENGTH } from "../../lib/settings";

export const Empty = () => {
  const boxes = new Array(MAX_WORD_LENGTH).fill(0);
  return (
    <div className="flex justify-center mb-1">
      {boxes.map((box, i) => (
        <Box key={i} />
      ))}
    </div>
  );
};
