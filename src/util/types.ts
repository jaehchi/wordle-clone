// Statuses
export type KeyStatus = 'correct' | 'present' | 'absent';
type ActionKeys = 'ENTER' | 'BACKSPACE';
type CharKeys =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';
export type ValidKeys = ActionKeys | CharKeys;

//Stats
export type GameStatus = 'WON' | 'ONGOING' | 'LOSS';
export type GameState = {
  board: string[];
  solution: string | null;
  index: number | null;
  gameStatus: GameStatus;
  attempts: number;
  evaluations: string[];
};
export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winPercentage: number;
  spread: { [key: string]: number };
};
