import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { IExercise } from 'types/IExercise';
import { useSelectedExercises } from 'pages-components/CreateWorkout/hooks/useSelectedExercises';
import { SetStateAction, Dispatch, useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  exercise: IExercise;
}

export const EditSelectedExerciseModal = ({
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
    setReps(exercise.repetitions);
  }, [exercise, isOpen]);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleUpdateExercise() {
    const updatedExercise = { ...exercise, sets, repetitions: reps };

    selectedExercisesDispatch({
      type: 'UPDATE-WORKOUT',
      payload: updatedExercise,
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
        <Button className="h-[4.2rem]" onClick={handleUpdateExercise}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};
