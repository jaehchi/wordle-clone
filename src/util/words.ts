import { words } from '../lib/words';
import { validWords } from '../lib/validwords';
import { loadGameState } from './statistics';
import { getCharIndexes } from './status';
import { PRESENT_ERROR_MESSAGE, CORRECT_ERROR_MESSAGE } from '../lib/strings';

export const formatWord = (word: string): string[] => {
  return word.toUpperCase().split('');
};

export const isWordInWordList = (guess: string): boolean => {
  return words.includes(guess) || validWords.includes(guess);
};

export const isPassingHardMode = (guess: string) => {
  const { solution, evaluations } = loadGameState()
  const solutionCharIndexes = getCharIndexes(solution);
  const guessCharIndexes = getCharIndexes(guess);

  for(let i = 0; i < evaluations.length; i++ ) {
    let status = evaluations[i]; 
    if(status === 'present') { 
      if (!guessCharIndexes.has(solution[i])) return PRESENT_ERROR_MESSAGE(solution[i]);
      if (guessCharIndexes.has(guess[i])) {
        if(solutionCharIndexes.get(solution[i]).length - guessCharIndexes.get(solution[i]).length > 0) {
          return PRESENT_ERROR_MESSAGE(solution[i]);
        }
      }
    }
    if(status === 'correct') {
      if (solution[i] !== guess[i]) return CORRECT_ERROR_MESSAGE(solution[i], i)
    }
  }

  return true;
};

//todo: Allow for multiple games a day
export const generateNewSolution = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const solution = generateNewSolution();
