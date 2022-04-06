import { words } from '../lib/words';
import { validWords } from '../lib/validwords';

export const formatWord = (word: string): string[] => {
  return word.toUpperCase().split('');
}

export const isWordInWordList = (guess: string): boolean => {
  return validWords.includes(guess);
} 

export const getSolution = () => {
  return words[Math.floor(Math.random() * words.length)];
}

export const solution = getSolution();