import { isFailingHardMode } from '../words';
import { createMockEvaluation } from '../statistics';
import {
  PRESENT_ERROR_MESSAGE,
  CORRECT_ERROR_MESSAGE,
} from '../../lib/strings';

describe('1. isFailingHardMode', () => {
  const solution = 'cargo';
  it('Should ignore absent cases', () => {
    createMockEvaluation(solution, [
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ]);
    expect(isFailingHardMode('donut')).toEqual(false);
  });

  it('Should catch unused present letter', () => {
    createMockEvaluation(solution, [
      'absent',
      'absent',
      'present',
      'absent',
      'absent',
    ]);
    expect(isFailingHardMode('donut')).toEqual(PRESENT_ERROR_MESSAGE('R'));
  });

  it('Should catch unused correct letter', () => {
    createMockEvaluation(solution, [
      'absent',
      'absent',
      'correct',
      'absent',
      'absent',
    ]);
    expect(isFailingHardMode('donut')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
  });

  it('Should catch dupes', () => {
    createMockEvaluation('still', [
      'absent',
      'absent',
      'absent',
      'correct',
      'present',
    ]);
    expect(isFailingHardMode('stale')).toEqual(PRESENT_ERROR_MESSAGE('l'));
  });


  it('Should catch first unused letter', () => {
    createMockEvaluation(solution, [
      'absent',
      'present',
      'correct',
      'absent',
      'correct',
    ]);
    expect(isFailingHardMode('ratio')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isFailingHardMode('macro')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isFailingHardMode('micro')).toEqual(PRESENT_ERROR_MESSAGE('a'));
    expect(isFailingHardMode('halos')).toEqual(CORRECT_ERROR_MESSAGE('r', 2));
    expect(isFailingHardMode('haros')).toEqual(CORRECT_ERROR_MESSAGE('o', 4));
  });

  it(`Should return false when the same word is guessed twice`, () => {
    createMockEvaluation(solution, [
      'absent',
      'correct',
      'present',
      'absent',
      'correct',
    ]);
    expect(isFailingHardMode('radio')).toEqual(false);
  });

  it('Should handle statuses for duplicate letters', () => {
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
      'semee',
    ];
    
    const results = [
      PRESENT_ERROR_MESSAGE('p'),
      CORRECT_ERROR_MESSAGE('p', 1),
      CORRECT_ERROR_MESSAGE('p', 1),
      false,
      false,
      CORRECT_ERROR_MESSAGE('e', 1),
      PRESENT_ERROR_MESSAGE('e'),
      PRESENT_ERROR_MESSAGE('e'),
      PRESENT_ERROR_MESSAGE('e'),
      false,
      CORRECT_ERROR_MESSAGE('e', 0),
      false,
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
      expect(isFailingHardMode(guess)).toEqual(results[i]);
    });
  });
});