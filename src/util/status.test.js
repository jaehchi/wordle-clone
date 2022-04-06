import { getCharStatus, getAllCharStatuses } from './status';

describe('1. Guess Statuses', () => {
  it('Should assign absent to all letters', () => {
    expect(getCharStatus('donut', 'bagel')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ]);
  });

  it('Should assign correct to all letters', () => {
    expect(getCharStatus('donut', 'donut')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ]);
  });

  //testing Multiple Same Letters (MSL)

  it('Should assign both MSL as present', () => {
    expect(getCharStatus('erase', 'speed')).toEqual([
      'present',
      'absent',
      'present',
      'present',
      'absent',
    ]);
  });

  it('Should assign 2 of the MSL correctly: correct & present', () => {
    expect(getCharStatus('crepe', 'speed')).toEqual([
      'absent',
      'present',
      'correct',
      'present',
      'absent',
    ]);
  });

  it('Should assign 2 of the MSL correctly: correct & absent', () => {
    expect(getCharStatus('steal', 'speed')).toEqual([
      'correct',
      'absent',
      'correct',
      'absent',
      'absent',
    ]);
  });

  it('Should assign 2 of the MSL correctly: present & absent', () => {
    expect(getCharStatus('abide', 'speed')).toEqual([
      'absent',
      'absent',
      'present',
      'absent',
      'present',
    ]);
  });

  it('Should assign all 3 MSLs correctly', () => {
    expect(getCharStatus('added', 'daddy')).toEqual([
      'present',
      'present',
      'correct',
      'present',
      'absent',
    ]);
  });

  it('Should prioritize assigning correct values over present', () => {
    expect(getCharStatus('eeeee', 'puree')).toEqual([
      'absent',
      'absent',
      'absent',
      'correct',
      'correct',
    ]);
  });
});

describe('2. All Character Statuses', () => {
  const guesses = ['bagel', 'scone', 'frost', 'donut'];
  const solution = 'donut';

  it('Should return correct statuses for each letter in 1st set of guesses', () => {
    expect(getAllCharStatuses(solution, guesses[0])).toEqual({
      b: 'absent',
      a: 'absent',
      g: 'absent',
      e: 'absent',
      l: 'absent',
    });
  });

  it('Should return correct statuses for each letter in 2nd set of guesses', () => {
    expect(getAllCharStatuses(solution, guesses.slice(0, 2))).toEqual({
      b: 'absent',
      a: 'absent',
      g: 'absent',
      e: 'absent',
      l: 'absent',
      s: 'absent',
      c: 'absent',
      o: 'present',
      n: 'present',
    });
  });

  it('Should return correct statuses for each letter in 3rd set of guesses', () => {
    expect(getAllCharStatuses(solution, guesses.slice(0, 3))).toEqual({
      b: 'absent',
      a: 'absent',
      g: 'absent',
      e: 'absent',
      l: 'absent',
      s: 'absent',
      c: 'absent',
      o: 'present',
      n: 'present',
      f: 'absent',
      r: 'absent',
      t: 'correct',
    });
  });

  it('Should return correct status for each letter in 4th set of guesses', () => {
    expect(getAllCharStatuses(solution, guesses)).toEqual({
      b: 'absent',
      a: 'absent',
      g: 'absent',
      e: 'absent',
      l: 'absent',
      s: 'absent',
      c: 'absent',
      o: 'correct',
      n: 'correct',
      f: 'absent',
      r: 'absent',
      t: 'correct',
      d: 'correct',
      u: 'correct',
    });
  });
});
