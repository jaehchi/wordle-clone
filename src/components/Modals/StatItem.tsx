type StatItemProps = {
  title: string;
  value: number;
};

export const StatItem = ({ title, value }: StatItemProps) => {
  return (
    <div className='w-12 mx-1'>
      <div className='text-xl font-normal'>{value}</div>
      <div>{title}</div>
    </div>
  );
};
