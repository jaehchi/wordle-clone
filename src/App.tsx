import { useState, useEffect } from "react";
import { Board } from "./components/Board/Board";
import { Keyboard } from "./components/Keyboard/Keyboard";
import { MAX_BOARD_LENGTH, MAX_WORD_LENGTH } from "./lib/settings";

export const App = () => {
  const solution = 'hello';
  const [currentGuess, setCurrentGuess] = useState("cake");
  const [board, setBoard] = useState(["donut", "bagel", "scone"]);

  const onChar = (value: string) => {
    if (currentGuess.length < MAX_WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    // if currentGuess is less  than max word length return
    // if word is noot in wordlist list return
    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      board.length < MAX_BOARD_LENGTH
    ) {
      setBoard([...board, currentGuess]);
      setCurrentGuess("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Board board={board} currentGuess={currentGuess} solution={solution} />
      <Keyboard board={board} solution={solution} onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
    </div>
  );
};
