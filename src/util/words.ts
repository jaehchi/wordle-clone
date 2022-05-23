import { solutions } from '../lib/solutions';
import { words } from '../lib/words';
import { loadGameState } from './statistics';
import { getCharIndexes } from './status';
import { PRESENT_ERROR_MESSAGE, CORRECT_ERROR_MESSAGE } from '../lib/strings';

export const formatWord = (string: string): string[] =>
  string.toUpperCase().split('');

export const isWordInWordList = (guess: string): boolean =>
  solutions.includes(guess) || words.includes(guess);

export const isFailingHardMode = (guess: string) => {
  const { solution, evaluations } = loadGameState();
  const solutionCharIndexes = getCharIndexes(solution);
  const guessCharIndexes = getCharIndexes(guess);

  for (let i = 0; i < evaluations.length; i++) {
    let status = evaluations[i];
    if (status === 'present') {
      if (!guessCharIndexes.has(solution[i]))
        return PRESENT_ERROR_MESSAGE(solution[i]);
      if (guessCharIndexes.has(solution[i])) {
        if (
          solutionCharIndexes.get(solution[i]).length -
            guessCharIndexes.get(solution[i]).length >
          0
        ) {
          return PRESENT_ERROR_MESSAGE(solution[i]);
        }
      }
    }
    if (status === 'correct') {
      if (solution[i] !== guess[i])
        return CORRECT_ERROR_MESSAGE(solution[i], i);
    }
  }

  return false;
};

//todo: Allow for multiple games a day
export const generateNewSolution = (prev?: number) => {
  const index = !prev ? Math.floor(Math.random() * solutions.length) : prev === solutions.length - 1 ? 0 : prev + 1;
  return {
    solution: solutions[index],
    index,
  };
};

export const solution = generateNewSolution();
