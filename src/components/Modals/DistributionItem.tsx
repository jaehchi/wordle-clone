import classnames from 'classnames';

type DistributionProps = {
  max: number;
  attempt: number;
  value: number;
  status: string;
  currentAttempt: number;
};

export const DistributionItem = ({
  max,
  attempt,
  value,
  status,
  currentAttempt,
}: DistributionProps) => {
  const percentage = Math.floor((value / max) * 100);
  const width = value === 0 || percentage < 7 ? 7 : percentage;
  const classname = classnames(
    'flex justify-center items-center font-bold text-xs text-blue-100 p-0.5',
    {
      'bg-blue-500': currentAttempt === attempt && status === 'WON',
      'bg-gray-500':
        currentAttempt !== attempt || status === 'LOSS' || status === 'ONGOING',
    }
  );
  return (
    <div className='flex justify-left p-[1.5px]'>
      <div className='w-2'>{attempt}</div>
      <div className='flex item-center justify-left w-full ml-2'>
        <div style={{ width: `${width}%` }} className={classname}>
          {value}
        </div>
      </div>
    </div>
  );
};
