import {
  IoIosHelpCircleOutline,
  IoIosStats,
  IoIosSettings,
} from 'react-icons/io';

type NavProps = {
  handleGuideOpen: () => void;
  handleStatsOpen: () => void;
  handleSettingsOpen: () => void;
};

export const Nav = ({
  handleGuideOpen,
  handleStatsOpen,
  handleSettingsOpen,
}: NavProps) => {
  return (
    <nav className='flex item-center py-1.5 px-4 border-solid border-b border-gray-400'>
      <div
        className='w-10 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto'
        onClick={() => handleGuideOpen()}>
        <IoIosHelpCircleOutline size='1.75em' />
      </div>
      <div className='w-full ml-9 text-center font-semibold text-4xl'>
        Wordle
      </div>
      <div
        className='w-8 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto ml-1'
        onClick={() => handleStatsOpen()}>
        <IoIosStats size='1.5em' />
      </div>
      <div
        className='w-8 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto ml-1'
        onClick={() => handleSettingsOpen()}>
        <IoIosSettings size='1.5em' />
      </div>
    </nav>
  );
};
