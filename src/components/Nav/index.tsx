import {
  IoIosHelpCircleOutline,
  IoIosStats,
  IoMdMoon,
  IoMdSunny,
} from 'react-icons/io';

type Props = {
  isDark: boolean;
  handleGuideOpen: () => void;
  handleStatsOpen: () => void;
  handleDarkMode: (isDark: boolean) => void;
};

export const Nav = ({ isDark, handleGuideOpen, handleStatsOpen, handleDarkMode  }: Props) => {
  return (
    <nav className='flex item-center py-1.5 px-4 border-solid border-b border-gray-400'>
      <div className='w-10 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto' onClick={() => handleGuideOpen()}>
        <IoIosHelpCircleOutline size='1.75em'/>
      </div>
      <div className='w-full ml-9 text-center font-semibold text-4xl'>
        Wordle
      </div>
      <div className='w-8 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto ml-1' onClick={() => handleStatsOpen()}>
        <IoIosStats size='1.5em' />
      </div>
      <div className='w-8 hover:bg-snow dark:hover:bg-frost rounded-lg p-1 my-auto ml-1' onClick={() => handleDarkMode(!isDark)}>
        {isDark ?  <IoMdSunny size='1.5em'/> : <IoMdMoon size='1.5em'/>}
      </div>
    </nav>
  );
};
