import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { totalmem } from 'os';
import { Dispatch, SetStateAction } from 'react';
import EmployeesService from 'services/EmployeesService';
import { toast } from 'utils/toast';
import { Employee } from '../..';

interface Props {
  employeeId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
}

export const DeleteEmployeeModal = ({
  employeeId,
  isOpen,
  setIsOpen,
  setEmployees,
}: Props) => {
  async function handleDeleteEmployee() {
    try {
      await EmployeesService.delete(employeeId);
      setEmployees((prev) => prev.filter(({ id }) => id !== employeeId));
      toast({ status: 'error', text: 'Funcionário deletado.' });
      handleCloseModal();
    } catch (err: any) {
      toast({ status: 'error', text: 'Erro ao delete funcionários' });
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <Modal isModalOpen={isOpen} handleCloseModal={handleCloseModal}>
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
          onClick={() => handleDeleteEmployee()}
          className="flex-1 h-[3.6rem]"
        >
          Remover Funcionário
        </Button>
      </div>
    </Modal>
  );
};
