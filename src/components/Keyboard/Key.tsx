import classnames from 'classnames';
import { KeyStatus } from '../../util/types';
import { EVAL_DELAY } from '../../lib/settings'

type KeyProps = {
  char?: string;
  children?: string | JSX.Element
  status?: KeyStatus;
  isEvalAnimating?: boolean;
};

export const Key = ({ char, children, status, isEvalAnimating }: KeyProps) => {
  const transitionDelay = isEvalAnimating ? `${EVAL_DELAY}ms`:  '0';
  const classname = classnames(
    'w-8 sm:w-11 h-14 flex justify-center items-center font-bold text-sm mx-[3px] border-2 rounded',
    {
      'w-[50px] sm:w-16': children,
      'border-gray-300 bg-gray-300 dark:text-polar-200': !status,
      'border-green-600 bg-green-600 text-white': status === 'correct',
      'border-yellow-500 bg-yellow-500 text-white': status === 'present',
      'border-polar-100 bg-polar-100 text-white': status === 'absent',
    }
  );

  return <div style={{ transitionDelay }} className={classname}>{children || char?.toUpperCase()}</div>;
};
