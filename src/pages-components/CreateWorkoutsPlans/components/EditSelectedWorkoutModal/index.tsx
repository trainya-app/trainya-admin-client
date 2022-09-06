import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { IExercise } from 'pages-components/CreateWorkoutsPlans';
import { useSelectedExercises } from 'pages-components/CreateWorkoutsPlans/hooks/useSelectedExercises';
import { SetStateAction, Dispatch, useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  exercise: IExercise;
}

export const EditSelectedWorkout = ({
  isOpen,
  setIsOpen,
  title,
  exercise,
}: Props) => {
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const { selectedExercisesDispatch } = useSelectedExercises();

  useEffect(() => {
    setSets(exercise.sets);
    setReps(exercise.reps);
  }, [exercise, isOpen]);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleUpdateWorkout() {
    const updatedWorkout = { ...exercise, sets, reps };
    selectedExercisesDispatch({
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
