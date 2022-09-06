import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { IWorkout } from 'pages-components/CreateWorkoutsPlans';
import { useSelectedWorkouts } from 'pages-components/CreateWorkoutsPlans/hooks/useSelectedWorkouts';
import { SetStateAction, Dispatch, useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  workout: IWorkout;
}

export const EditSelectedWorkout = ({
  isOpen,
  setIsOpen,
  title,
  workout,
}: Props) => {
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const { selectedWorkoutsDispatch } = useSelectedWorkouts();

  useEffect(() => {
    setSets(workout.sets);
    setReps(workout.reps);
  }, [workout, isOpen]);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleUpdateWorkout() {
    const updatedWorkout = { ...workout, sets, reps };
    selectedWorkoutsDispatch({
      type: 'UPDATE-WORKOUT',
      payload: updatedWorkout,
    });
    handleCloseModal();
  }

  return (
    <Modal
      title={title || ''}
      isModalOpen={isOpen}
      handleCloseModal={handleCloseModal}
      className="max-w-[50rem]"
    >
      <div className="flex flex-col gap-6">
        <div>
          <span>Sets: </span>
          <Input
            placeholder="oioi"
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
        </div>

        <div>
          <span>Repetições: </span>
          <Input
            placeholder="oioi"
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
        </div>
        <Button className="h-[4.2rem]" onClick={handleUpdateWorkout}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};
