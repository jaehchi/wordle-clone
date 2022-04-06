export type GameStatus = 'WON' | 'ONGOING' | 'LOSS';

export type GameState = {
  board: string[];
  solution: string | null;
  gameStatus: GameStatus;
  attempts: number;
};

export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winPercentage: number;
  spread: { [key: string]: number };
};

const newState: GameState = {
  board: [],
  solution: null,
  gameStatus: 'ONGOING',
  attempts: 0,
};

const newStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  winPercentage: 0,
  spread: {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
  },
};

export const saveGameState= (state: GameState) => {
  localStorage.setItem('state', JSON.stringify(state));
};

export const loadGameState= () => {
  const state = localStorage.getItem('state');
  return state ? JSON.parse(state) : newState;
};

const saveGameStats = (stats: GameStats) => {
  localStorage.setItem('stats', JSON.stringify(stats));
};

export const loadGameStats = () => {
  const stats = localStorage.getItem('stats');
  return stats ? JSON.parse(stats) : newStats;
};

export const saveGameStateToGameStats = (
  stats: GameStats,
  attempts: number
) => {
  stats.gamesPlayed++;

  if (attempts < 7) {
    stats.gamesWon += 1;
    stats.currentStreak += 1;
    stats.spread[attempts] += 1;
  } else {
    stats.currentStreak = 0;
  }

  if (stats.currentStreak > stats.maxStreak) {
    stats.maxStreak = stats.currentStreak;
  }

  stats.winPercentage = Math.floor((stats.gamesWon / stats.gamesPlayed) * 100);

  saveGameStats(stats);
  return stats;
};
