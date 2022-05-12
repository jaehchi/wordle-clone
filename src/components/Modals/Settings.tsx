import { Modal } from './Modal';
import { ToggleSwitch } from '../globals/ToggleSwitch';
import {
  SETTINGS_TITLE,
  HARD_MODE,
  HARD_DESCRIPTION,
  HARD_MODE_DISABLED_MESSAGE,
  DARK_THEME,
} from '../../lib/strings';
import { notifyError } from '../../util/notifications';

type SettingsProps = {
  isOpen: boolean;
  isDark: boolean;
  isHard: boolean;
  isToggleDisabled: boolean;
  handleClose: () => void;
  handleDarkMode: (bool: boolean) => void;
  handleHardMode: (bool: boolean) => void;
};

export const Settings = ({
  isOpen,
  isDark,
  isHard,
  isToggleDisabled,
  handleClose,
  handleDarkMode,
  handleHardMode,
}: SettingsProps) => {
  return isOpen ? (
    <Modal width={'w-125'} handleClose={handleClose}>
      <h1 className='pb-2'>{SETTINGS_TITLE}</h1>
      <div className='flex justify-left w-full p-2'>
        <div className='flex item-center justify-left w-full ml-2 font-bold'>
          <h2>{DARK_THEME}</h2>
        </div>
        <ToggleSwitch isMode={isDark} handleMode={handleDarkMode} />
      </div>
      <div className='flex justify-left w-full p-2'>
        <div className='flex flex-col  justify-left w-full'>
          <h2 className='flex justify-left w-full ml-2 font-bold'>
            {HARD_MODE}
          </h2>
          <p className='flex justify-left w-full ml-2 text-xs'>
            {HARD_DESCRIPTION}
          </p>
        </div>
        <div
          className='flex items-center'
          onClick={() =>
            isToggleDisabled ? notifyError(HARD_MODE_DISABLED_MESSAGE) : null
          }>
          <ToggleSwitch
            isMode={isHard}
            isToggleDisabled={isToggleDisabled}
            handleMode={handleHardMode}
          />
        </div>
      </div>
    </Modal>
  ) : null;
};
