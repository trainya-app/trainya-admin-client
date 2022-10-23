import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { useUser } from 'hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IMember } from 'pages-components/CreateWorkoutsPlans';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import GymsService, { GymMember } from 'services/GymsService';
import MembersWorkoutPlans from 'services/MembersWorkoutPlans';
import WorkoutPlansService from 'services/WorkoutPlansService';
import { toast } from 'utils/toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workoutPlanId: number;
}

export const DeleteWorkoutPlanModal = ({
  isOpen,
  setIsOpen,
  workoutPlanId,
}: Props) => {
  const router = useRouter();

  async function handleDeleteWorkoutPlan() {
    try {
      await WorkoutPlansService.delete(workoutPlanId);
      toast({ status: 'success', text: 'Plano de treino deletado. ' });
      router.push('/workouts');
      handleCloseModal();
      // setWorkouts
    } catch (err: any) {
      toast({
        status: 'error',
        text:
          err?.response?.data?.message || 'Erro ao deletar plano de treino. ',
      });
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      title="Deseja mesmo deletar o plano de treino?"
      isModalOpen={isOpen}
      handleCloseModal={handleCloseModal}
      className="max-w-[600px]"
    >
      <div className="flex gap-2 w-full">
        <Button
          className="flex-1 h-[3.6rem]"
          variant="white"
          onClick={() => handleCloseModal()}
        >
          Cancelar
        </Button>
        <Button
          className="flex-1 h-[3.6rem]"
          variant="danger"
          onClick={() => handleDeleteWorkoutPlan()}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  );
};
