import { Modal } from './Modal';
import { Box } from '../Board/Box';
import { formatWord } from '../../util/words';
import { KeyStatus } from '../../util/types';

type GuideProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Guide = ({ isOpen, handleClose }: GuideProps) => {
  const correctExample = formatWord('donut');
  const presentExample = formatWord('bagel');
  const absentExample = formatWord('scone');
  
  const getWordDemo = (word: string[], status: KeyStatus, statusIndex: number, delay: number) => {
    return word.map((char, i) => {
      const isChar = i === statusIndex;
      return <Box 
          key={i} 
          char={char} 
          index={isChar ? delay : i} 
          status={isChar ? status : undefined}
          isEvalAnimating={isChar}
          isLastCompletedRow={isChar}
        />
    })
  }
  return isOpen ? (
    <Modal handleClose={handleClose}>
      <div className='w-9/12 sm:w-full text-xl font-bold'>
        <h2>HOW TO PLAY</h2>
      </div>
      <p className='sm:w-100 px-12 text-sm mt-3 mb-1'>
        Guess the word in six tries. After each guess, the color of the tiles
        will change to show how close your guess was to the word.
      </p>
      <div className='flex mt-4 mb-1'>
        {getWordDemo(correctExample, 'correct', 0, 1)}
      </div>
      <p className='text-sm'>
        The letter <span className='font-bold'>D</span> is in the word and in
        the correct spot.
      </p>
      <div className='flex mt-6 mb-2'>
        {getWordDemo(presentExample, 'present', 1, 2)}
      </div>
      <p className='text-sm'>
        The letter <span className='font-bolder'>A</span> is in the word but in
        the wrong spot.
      </p>
      <div className='flex mt-4 mb-1'>
        {getWordDemo(absentExample, 'absent', 3, 3)}
      </div>
      <p className='text-sm'>
        The letter <span className='font-bold'>N</span> is not in the word in
        any spot.
      </p>
    </Modal>
  ) : null;
};
