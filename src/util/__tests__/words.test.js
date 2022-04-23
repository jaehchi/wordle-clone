import { isPassingHardMode } from '../words';
import { createMockEvaluation } from '../statistics';
import { PRESENT_ERROR_MESSAGE, CORRECT_ERROR_MESSAGE } from '../../lib/strings';

describe('1. isPassingHardMode', () => {
  const solution = 'cargo';
  it('Should ignore absent cases', () => {
    createMockEvaluation(solution, ['absent', 'absent', 'absent', 'absent', 'absent']);
    expect(isPassingHardMode('donut')).toEqual(true);
  });

  it('Should catch unused present letter', () => {
    createMockEvaluation(solution, ['absent', 'absent', 'present', 'absent', 'absent']);
    expect(isPassingHardMode('donut')).toEqual(PRESENT_ERROR_MESSAGE('R'));
  });
  
  it('Should catch unused correct letter', () => {
    createMockEvaluation(solution, ['absent', 'absent', 'correct', 'absent', 'absent']);
    expect(isPassingHardMode('donut')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
  });

  it('Should catch first unused letter', () => {
    createMockEvaluation(solution, ['absent', 'present', 'correct', 'absent', 'correct']);
    expect(isPassingHardMode('ratio')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isPassingHardMode('macro')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isPassingHardMode('micro')).toEqual(PRESENT_ERROR_MESSAGE('a'));
    expect(isPassingHardMode('halos')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isPassingHardMode('haros')).toEqual(CORRECT_ERROR_MESSAGE('o', 4));
  });
  
  it(`Should return true when the same word is guessed twice`, () => {
    createMockEvaluation(solution, ['absent', 'correct', 'present', 'absent', 'correct']);
    expect(isPassingHardMode('radio')).toEqual(true);
  });
  
  it('Should handle statuses for duplicate letters',  () => {
    const solutions = [
      'apple',
      'apple', 
      'apple', 
      'apple',
      'appal', 
      'eerie',
      'eerie', 
      'eerie', 
      'eerie', 
      'eerie', 
      'eerie',
      'eerie', 
    ];
    const guesses = [
      'apart',
      'hoped',
      'hippo',
      'appel',
      'appay',
      'puree',
      'puree',     
      'puree',     
      'puree',     
      'semee',
      'semee',
      'semee'
    ];
    const results = [
      PRESENT_ERROR_MESSAGE('p'),
      CORRECT_ERROR_MESSAGE('p', 1),
      CORRECT_ERROR_MESSAGE('p', 1),
      true,
      true,
      CORRECT_ERROR_MESSAGE('e', 1),
      PRESENT_ERROR_MESSAGE('e'),
      PRESENT_ERROR_MESSAGE('e'),
      PRESENT_ERROR_MESSAGE('e'),
      true,
      CORRECT_ERROR_MESSAGE('e', 0),
      true
    ];

    const evaluations = [
      ['absent', 'correct', 'present', 'absent', 'absent'],
      ['absent', 'correct', 'present', 'absent', 'absent'],
      ['absent', 'correct', 'present', 'absent', 'absent'],
      ['absent', 'correct', 'present', 'absent', 'absent'],
      ['present', 'correct', 'present', 'correct', 'absent'],
      ['absent', 'correct', 'absent', 'absent', 'present'],
      ['present', 'correct', 'absent', 'absent', 'present'],
      ['present', 'correct', 'absent', 'absent', 'present'],
      ['present', 'present', 'absent', 'absent', 'present'],
      ['present', 'present', 'absent', 'absent', 'present'],
      ['correct', 'present', 'absent', 'absent', 'present'],
      ['present', 'correct', 'absent', 'absent', 'present'],
    ];

    guesses.forEach((guess, i) => {
        createMockEvaluation(solutions[i], evaluations[i]);
        expect(isPassingHardMode(guess)).toEqual(results[i]);
      });
    }); 
});








// expect(isPassingHardMode('apple', 'apart')).toEqual(PRESENT_ERROR_MESSAGE('p'));
// expect(isPassingHardMode('apple', 'hoped')).toEqual(CORRECT_ERROR_MESSAGE('p', 1));
// expect(isPassingHardMode('apple', 'hippo')).toEqual(CORRECT_ERROR_MESSAGE('p', 1));
// expect(isPassingHardMode('apple', 'appel')).toEqual(true);
// expect(isPassingHardMode('appal', 'appay', ['present', 'correct', 'present', 'correct', 'absent'])).toEqual(true);
// expect(isPassingHardMode('eerie', 'puree', ['absent', 'correct', 'absent', 'absent', 'present'])).toEqual(CORRECT_ERROR_MESSAGE('e', 1));
// expect(isPassingHardMode('eerie', 'puree', ['present', 'correct', 'absent', 'absent', 'present'])).toEqual(PRESENT_ERROR_MESSAGE('e'));
// expect(isPassingHardMode('eerie', 'puree', ['present', 'correct', 'absent', 'absent', 'present'])).toEqual(PRESENT_ERROR_MESSAGE('e'));
// expect(isPassingHardMode('eerie', 'puree', ['present', 'present', 'absent', 'absent', 'present'])).toEqual(PRESENT_ERROR_MESSAGE('e'));
// expect(isPassingHardMode('eerie', 'semee', ['present', 'present', 'absent', 'absent', 'present'])).toEqual(true);
// expect(isPassingHardMode('eerie', 'semee', ['correct', 'present', 'absent', 'absent', 'present'])).toEqual(CORRECT_ERROR_MESSAGE('e', 0));
// expect(isPassingHardMode('eerie', 'semee', ['present', 'correct', 'absent', 'absent', 'present'])).toEqual(true);