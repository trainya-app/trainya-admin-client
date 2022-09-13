import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'components/Modal';

interface CreateExercisesModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateExerciseModal = ({
  isOpen,
  setIsOpen,
}: CreateExercisesModalProps) => {
  console.log('create exercise');

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isModalOpen={isOpen}
      title="Criar exercício"
      handleCloseModal={handleCloseModal}
      className="max-w-[100px]"
    >
      <div>
        <p>Modal to create exercised</p>
      </div>
    </Modal>
  );
};
