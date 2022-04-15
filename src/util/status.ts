import { KeyStatus } from './types';

export const getCharStatus = (solution: string, guess: string): KeyStatus[] => {
  const solutionCharIndexes = new Map();
  const statuses: KeyStatus[] = new Array(guess.length).fill(false);

  for (let i = 0; i < solution.length; i++) {
    solutionCharIndexes.set(solution[i], [
      i,
      ...(solutionCharIndexes.get(solution[i]) || []),
    ]);
  }

  // handle correct and absent cases first..
  for (let i = 0; i < guess.length; i++) {
    if (!solutionCharIndexes.has(guess[i])) statuses[i] = 'absent';
    if (guess[i] === solution[i]) {
      solutionCharIndexes.set(
        guess[i],
        solutionCharIndexes.get(guess[i]).filter((n: number) => n !== i)
      );
      statuses[i] = 'correct';
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (!statuses[i]) {
      let remainingPresentIndexes = solutionCharIndexes.get(guess[i]);
      if (!remainingPresentIndexes.length) statuses[i] = 'absent';
      if (remainingPresentIndexes.length > 0) {
        statuses[i] = 'present';
        remainingPresentIndexes.pop();
      }
    }
  }

  return statuses;
};

export const getAllCharStatuses = (solution: string, board: string[]) => {
  const chars: { [key: string]: KeyStatus } = {};

  for (let word of board) {
    for (let j = 0; j < word.length; j++) {
      let letter = word[j];
      if (letter === solution[j]) chars[letter] = 'correct';
      if (!solution.includes(letter)) chars[letter] = 'absent';
      if (!chars[letter]) chars[letter] = 'present';
    }
  }

  return chars;
};
