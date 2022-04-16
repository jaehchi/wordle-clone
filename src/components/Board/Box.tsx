import classnames from 'classnames';
import { KeyStatus } from '../../util/types';

type BoxProps = {
  char?: string;
  status?: KeyStatus;
};

export const Box = ({ char, status }: BoxProps) => {
  const classname = classnames(
    'w-16 h-16 mx-0.5 border-2 flex justify-center items-center font-bold text-4xl',
    {
      'border-slate-400 dark:border-frost': !char && !status,
      'border-polar-100 dark:border-white': char && !status,
      'border-green-600 bg-green-600 text-white': status === 'correct',
      'border-yellow-500 bg-yellow-500 text-white': status === 'present',
      'border-polar-100 bg-polar-100 text-white': status === 'absent',
    }
  );
  
  return (
    <div className='flex justify-center mb-1'>
      <div className={classname}>{char}</div>
    </div>
  );
};
