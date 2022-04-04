import classnames from "classnames";

type BoxProps = {
  char?: string;
};

export const Box = ({ char }: BoxProps) => {
  const classname = classnames(
    "w-16 h-16 mx-0.5 border-2 flex justify-center items-center font-bold text-4xl"
  );

  return (
    <div className="flex justify-center mb-1">
      <div className={classname}>{char}</div>
    </div>
  );
};
