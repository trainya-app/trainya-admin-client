import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Dispatch, SetStateAction } from 'react';
import GymMembersService from 'services/GymMembersService';
import { GymMember } from 'services/GymsService';
import { toast } from 'utils/toast';

interface Props {
  memberId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMembers: Dispatch<SetStateAction<GymMember[]>>;
}

export const DeleteMemberModal = ({
  memberId,
  isOpen,
  setIsOpen,
  setMembers,
}: Props) => {
  async function handleDeleteMember() {
    try {
      await GymMembersService.delete(memberId);
      setMembers((prev) => prev.filter(({ id }) => id !== memberId));
      toast({ status: 'error', text: 'Membro deletado.' });
      handleCloseModal();
    } catch (err: any) {
      toast({ status: 'error', text: 'Erro ao deletar membro. ' });
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      isModalOpen={isOpen}
      handleCloseModal={handleCloseModal}
      className="max-w-[500px]"
      title="Remover membro"
    >
      <div className="w-full flex gap-4">
        <Button
          variant="white"
          onClick={() => handleCloseModal()}
          className="flex-1 h-[3.6rem]"
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteMember()}
          className="flex-1 h-[3.6rem]"
        >
          Remover Membro
        </Button>
      </div>
    </Modal>
  );
};
