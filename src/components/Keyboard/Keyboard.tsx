import { useEffect } from "react";
import { Key } from "./Key";
import { ValidKeys } from "../../utils/types";
import { getAllCharStatuses } from '../../utils/status';

type KeyboardProps = {
  board: string[];
  solution: string;
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export const Keyboard = ({ board, solution, onChar, onDelete, onEnter }: KeyboardProps) => {
  const top = "qwertyuiop".split("");
  const mid = "asdfghjkl".split("");
  const bot = "zxcvbnm".split("");
  const statuses = getAllCharStatuses(solution, board);

  const isValidKeys = (val: string): val is ValidKeys => {
    return (
      [...top, ...mid, ...bot].includes(val) ||
      val === "Enter" ||
      val === "Backspace"
    );
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const key = e.key;
      if (!isValidKeys(key)) return;
      if (key === "Backspace") return onDelete();
      if (key === "Enter") return onEnter();
      return onChar(key);
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  return (
    <div>
      <div className="flex justify-center mb-2">
        {top.map((char, i) => (
          <Key key={i} char={char} status={statuses[char]} />
        ))}
      </div>
      <div className="flex justify-center mb-2">
        {mid.map((char, i) => (
          <Key key={i} char={char} status={statuses[char]} />
        ))}
      </div>
      <div className="flex justify-center mb-2">
        <Key char="Enter">ENTER</Key>
        {bot.map((char, i) => (
          <Key key={i} char={char} status={statuses[char]} />
        ))}
        <Key char="del">delete</Key>
      </div>
    </div>
  );
};
