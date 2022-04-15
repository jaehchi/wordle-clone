import { ReactNode, useEffect, useRef } from 'react';

type ModalProps = {
  children?: ReactNode;
  width?: string;
  handleClose: () => void;
};

export const Modal = ({ children, width, handleClose }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [handleClose]);

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (ref?.current?.contains(e.target as Node)) return;
      handleClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleClose]);

  return (
    <div className='fixed w-screen h-screen flex items-center justify-center bg-gray-400 dark:bg-polar-200 dark:bg-opacity-75 bg-opacity-50 text-center'>
      <div
        className={`${width} py-6 sm:px-6 mx-2 pop-in relative flex flex-col justify-center items-center dark:bg-dark bg-white rounded-lg shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),_0_6px_20px_0_rgba(0,0,0,0.19)]`}
        ref={ref}>
        {children}
      </div>
    </div>
  );
};
