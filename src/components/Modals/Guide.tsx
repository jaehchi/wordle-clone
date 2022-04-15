import { Modal } from './Modal';
import { Box } from '../Board/Box';

type GuideProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Guide = ({ isOpen, handleClose }: GuideProps) => {
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
        <Box char={'D'} status='correct' />
        <Box char={'O'} />
        <Box char={'N'} />
        <Box char={'U'} />
        <Box char={'T'} />
      </div>
      <p className='text-sm'>
        The letter <span className='font-bold'>D</span> is in the word and in
        the correct spot.
      </p>
      <div className='flex mt-6 mb-2'>
        <Box char={'B'} />
        <Box char={'A'} status='present' />
        <Box char={'G'} />
        <Box char={'E'} />
        <Box char={'L'} />
      </div>
      <p className='text-sm'>
        The letter <span className='font-bolder'>A</span> is in the word but in
        the wrong spot.
      </p>
      <div className='flex mt-4 mb-1'>
        <Box char={'S'} />
        <Box char={'C'} />
        <Box char={'O'} />
        <Box char={'N'} status='absent' />
        <Box char={'E'} />
      </div>
      <p className='text-sm'>
        The letter <span className='font-bold'>N</span> is not in the word in
        any spot.
      </p>
    </Modal>
  ) : null;
};
