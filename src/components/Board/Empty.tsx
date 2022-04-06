import { Box } from "./Box";
import { MAX_CHARS } from "../../lib/settings";

export const Empty = () => {
  const boxes = new Array(MAX_CHARS).fill(0);
  
  return (
    <div className="flex justify-center mb-1">
      {boxes.map((box, i) => (
        <Box key={i} />
      ))}
    </div>
  );
};
