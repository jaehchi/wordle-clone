type Props = {
  handleGuideOpen: () => void;
  handleStatsOpen: () => void;
};

export const Nav = ({ handleGuideOpen, handleStatsOpen }: Props) => {
  return (
    <nav className='flex item-center py-1.5 px-4 border-solid border-b border-gray-400'>
      <div className='w-8' onClick={() => handleGuideOpen()}>
        x
      </div>
      <div className='w-full ml-9 text-center font-semibold text-4xl'>
        Wordle
      </div>
      <div className='w-8mr-1' onClick={() => handleStatsOpen()}>
        x
      </div>
      <div className='w-8ml-1'>x</div>
    </nav>
  );
};
