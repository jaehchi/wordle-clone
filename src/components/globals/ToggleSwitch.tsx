import { notifyError } from '../../util/notifications';

type ToggleSwitchProps = {
  isMode: boolean;
  isToggleDisabled?: boolean;
  handleMode: (bool: boolean) => void;
};

export const ToggleSwitch = ({
  isMode,
  isToggleDisabled,
  handleMode,
}: ToggleSwitchProps) => {
  return (
    <div className='flex items-center justify-center'>
      <label className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            className='sr-only'
            checked={isMode}
            disabled={isToggleDisabled}
            onChange={() => handleMode(!isMode)}
          />
          <div className='box bg-gray-600 w-10 h-6 rounded-full'></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 text-xs rounded-full transition`}>
            {isMode ? '✓' : '✕'}
          </div>
        </div>
      </label>
    </div>
  );
};
