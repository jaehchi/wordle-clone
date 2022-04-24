export const STATISTICS_TITLE = 'STATISTICS';
export const GUESS_DISTRIBUTION = 'GUESS DISTRIBUTION';
export const GAME_PLAYED = 'Played';
export const WIN_PERCENTAGE = 'Win %';
export const CURRENT_STREAK = 'Current Streak';
export const MAX_STREAK = 'Max Streak';
export const NEXT_WORDLE = 'NEXT WORDLE';
export const GUIDE_TITLE = 'HOW TO PLAY';
export const HOW_TO_PLAY =
  'Guess the word in six tries. After each guess, the color of the tiles will change to show how close your guess was to the word';
export const CORRECT_DESCRIPTION = 'is in the word and in the correct spot.';
export const PRESENT_DESCRIPTION = 'is in the word but in the wrong spot.';
export const ABSENT_DESCRIPTION = 'is not in the word in any spot.';
export const NOT_ENOUGH_CHARS = 'Must be a 5 letter word';
export const NOT_IN_WORD_LIST = 'Not in word list';
export const NOT_GAME_OVER = 'Game currently in progress';
export const WINNING_MESSAGES = [
  'Genius',
  'Magnificent',
  'Impressive',
  'Splendid',
  'Great',
  'Phew',
];
export const CORRECT_ERROR_MESSAGE = (char: string, index: number) => {
  const superScript = ['st', 'nd', 'rd', 'th', 'th'];
  return `${index + 1}${superScript[index]} letter must be ${char.toUpperCase()}`;
};
export const PRESENT_ERROR_MESSAGE = (char: string) =>
  `Guess must contain ${char.toUpperCase()}`;
