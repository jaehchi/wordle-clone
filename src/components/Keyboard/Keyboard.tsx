import { useEffect } from 'react';
import { IoIosBackspace } from 'react-icons/io';
import { Key } from './Key';
import { KEYBOARD_ROWS, ENTER, BACKSPACE } from '../../lib/strings';
import { ValidKeys } from '../../util/types';
import { getAllCharStatuses } from '../../util/status';
import { formatWord } from '../../util/words';

type KeyboardProps = {
  board: string[];
  solution: string;
  isEvalAnimating: boolean;
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export const Keyboard = ({
  board,
  solution,
  isEvalAnimating,
  onChar,
  onDelete,
  onEnter,
}: KeyboardProps) => {
  const top = formatWord(KEYBOARD_ROWS.top);
  const mid = formatWord(KEYBOARD_ROWS.mid);
  const bot = formatWord(KEYBOARD_ROWS.bot);
  const statuses = getAllCharStatuses(solution, board);

  const isValidKeys = (val: string): val is ValidKeys => {
    return (
      [...top, ...mid, ...bot].includes(val) ||
      val === 'ENTER' ||
      val === 'BACKSPACE'
    );
  };

  const handleClick = (val: string) => {
    if (val === 'ENTER') return onEnter();
    if (val === 'BACKSPACE') return onDelete();
    return onChar(val);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (!isValidKeys(key)) return;
      if (key === 'BACKSPACE') return onDelete();
      if (key === 'ENTER') return onEnter();
      return onChar(key);
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  });

  return (
    <div className='my-1 mx-2 md:p-4 lg:mt-4 xl:mt-4v'>
      <div className='flex justify-center mb-2'>
        {top.map((char, i) => (
          <Key
            key={i}
            char={char}
            status={statuses[char]}
            isEvalAnimating={isEvalAnimating}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className='flex justify-center mb-2'>
        {mid.map((char, i) => (
          <Key
            key={i}
            char={char}
            status={statuses[char]}
            isEvalAnimating={isEvalAnimating}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className='flex justify-center mb-2'>
        <Key char={ENTER} handleClick={handleClick}>
          {ENTER}
        </Key>
        {bot.map((char, i) => (
          <Key
            key={i}
            char={char}
            status={statuses[char]}
            isEvalAnimating={isEvalAnimating}
            handleClick={handleClick}
          />
        ))}
        <Key char={BACKSPACE} handleClick={handleClick}>
          <IoIosBackspace size='1.75em' />
        </Key>
      </div>
    </div>
  );
};
