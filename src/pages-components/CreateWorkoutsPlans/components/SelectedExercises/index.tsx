/* eslint-disable no-return-assign */
import { Dispatch, useCallback, useRef, useState } from 'react';

import { Button } from 'components/Button';
import { IExercise } from 'pages-components/CreateWorkoutsPlans';
import { SelectedExercisesAction } from 'pages-components/CreateWorkoutsPlans/reducers/selectedExercisesReducer';
import { EditSelectedExerciseModal } from '../EditSelectedExerciseModal';

interface Props {
  selectedExercises: IExercise[];
  selectedExercisesDispatch: Dispatch<SelectedExercisesAction>;
}

export const SelectedExercises = ({
  selectedExercises,
  selectedExercisesDispatch,
}: Props) => {
  const [isEditSelectedExerciseModalOpen, setIsEditSelectedExerciseModalOpen] =
    useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState({} as IExercise);
  const workoutTitle = useRef<string>('');

  const handleRemoveSelectedExercise = useCallback(
    (exercise: IExercise) => {
      selectedExercisesDispatch({ type: 'REMOVE-WORKOUT', payload: exercise });
    },
    [selectedExercisesDispatch]
  );

  function handleOpenEditExerciseModal(exercise: IExercise) {
    setExerciseToEdit(exercise);
    setIsEditSelectedExerciseModalOpen(true);
  }

  function handleSaveWorkout() {
    console.log('save workout in list');
    console.log(selectedExercises, workoutTitle.current);
  }

  return (
    <>
      <div className="flex flex-col">
        <h3 className="font-bold text-gray-600 text-3xl">Treinos</h3>
        <input
          className="bg-white h-[4.2rem] p-4 rounded-xl mt-4"
          placeholder="Título do treino"
          onChange={(e) => {
            workoutTitle.current = e.target.value;
          }}
        />
        <div className="w-full flex flex-col gap-6 flex-1 bg-white rounded-3xl mt-6 p-6 overflow-y-scroll">
          {selectedExercises?.map((exercise) => (
            <div
              key={exercise.id}
              className="relative flex flex-col items-center gap-4 bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
              }}
            >
              <div className="absolute w-full h-full left-0 top-0 bg-[#00000050]" />
              {/* <div className='absolute w-full h-full top-0 '/> */}
              <span className="font-bold text-white text-3xl z-10">
                {exercise.title}
              </span>
              <div className="flex w-full gap-3">
                <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                  Sets: {exercise.sets}
                </div>
                <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                  Reps: {exercise.reps}
                </div>
              </div>
              <footer className="flex gap-2 w-full mt-4 z-10">
                <Button
                  type="button"
                  onClick={() => handleRemoveSelectedExercise(exercise)}
                  variant="danger"
                  className="w-full h-[3.6rem] flex-1"
                >
                  Remover
                </Button>
                <Button
                  type="button"
                  variant="white"
                  className="bg-white flex-1 h-[3.6rem] rounded-2xl"
                  onClick={() => handleOpenEditExerciseModal(exercise)}
                >
                  Editar
                </Button>
              </footer>
            </div>
          ))}
        </div>
        <Button
          className="h-[3.6rem] mt-8"
          variant="primary"
          onClick={() => handleSaveWorkout()}
        >
          Salvar treino
        </Button>
      </div>
      <EditSelectedExerciseModal
        isOpen={isEditSelectedExerciseModalOpen}
        setIsOpen={setIsEditSelectedExerciseModalOpen}
        exercise={exerciseToEdit}
      />
    </>
  );
};
