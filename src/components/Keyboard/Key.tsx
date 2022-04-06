import classnames from "classnames";
import { KeyStatus } from '../../utils/types';
type KeyProps = {
  char?: string;
  children?: string;
  status?: KeyStatus;
};

export const Key = ({ char, children, status }: KeyProps) => {
  const classname = classnames(
    "w-11 h-14 flex justify-center items-center font-bold text-sm mx-[3px] border-2 rounded", {
      'bg-green-400': status === 'correct',
      'bg-yellow-500': status === 'present',
      'bg-gray-400': status === 'absent'
    }
  );
  return <div className={classname}>{children || char?.toUpperCase()}</div>;
};
