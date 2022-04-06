import classnames from "classnames";
import { KeyStatus } from '../../utils/types';

type BoxProps = {
  char?: string;
  status?: KeyStatus;
};

export const Box = ({ char, status }: BoxProps) => {
  const classname = classnames(
    "w-16 h-16 mx-0.5 border-2 flex justify-center items-center font-bold text-4xl", {
      'bg-green-400': status === 'correct',
      'bg-yellow-500': status === 'present',
      'bg-gray-400': status === 'absent'
    }
  );

  return (
    <div className="flex justify-center mb-1">
      <div className={classname}>{char}</div>
    </div>
  );
};
