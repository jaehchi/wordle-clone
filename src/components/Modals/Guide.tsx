import { Modal } from './Modal';
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Guide = ({ isOpen, handleClose }: Props) => {
  return isOpen ? (
    <Modal width='w-125' handleClose={handleClose}>
      helloo
    </Modal>
  ) : null;
}