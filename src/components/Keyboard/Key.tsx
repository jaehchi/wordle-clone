import classnames from "classnames";
type KeyProps = {
  char?: string;
  children?: string;
};

export const Key = ({ char, children }: KeyProps) => {
  const classname = classnames(
    "w-11 h-14 flex justify-center items-center font-bold text-sm mx-[3px] border-2 rounded"
  );
  return <div className={classname}>{children || char?.toUpperCase()}</div>;
};
