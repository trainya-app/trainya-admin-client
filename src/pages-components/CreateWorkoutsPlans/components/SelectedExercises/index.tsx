/* eslint-disable no-return-assign */
import { Dispatch, useCallback, useRef, useState } from 'react';

import { Button } from 'components/Button';
import { IExercise } from 'pages-components/CreateWorkoutsPlans';
import { SelectedExercisesAction } from 'pages-components/CreateWorkoutsPlans/reducers/selectedExercisesReducer';
import { useSelectedWorkouts } from 'pages-components/CreateWorkoutsPlans/hooks/useSelectedWorkouts';
import WorkoutExercisesService from 'pages-components/CreateWorkoutsPlans/services/WorkoutExercisesService';
import WorkoutService from 'pages-components/CreateWorkoutsPlans/services/WorkoutService';
import { toast } from 'utils/toast';
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
  const workoutDuration = useRef<string>('');
  const workoutTitleRef = useRef<HTMLInputElement>(null);
  const workoutDurationRef = useRef<HTMLInputElement>(null);

  const { selectedWorkoutsDispatch } = useSelectedWorkouts();

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

  async function handleSaveWorkout() {
    try {
      // TODO: grab the employeeId
      const employeeId = 1;

      const workout = {
        employeeId,
        title: workoutTitle?.current,
        duration: workoutDuration.current,
      };

      // TODO: do the api call to create workout and grab the id from database
      const workoutStored = await WorkoutService.store({
        title: workout.title,
        duration: workout.duration,
        employeeId: workout.employeeId,
      });

      // TODO: save exercixes
      const allWorkoutExercises = await Promise.all(
        selectedExercises.map((exercise) =>
          WorkoutExercisesService.store({
            exerciseId: exercise.id,
            sets: exercise.sets,
            repetitions: exercise.reps,
            workoutId: workoutStored.workout.id,
          })
        )
      );

      resetWorkoutFields();

      toast({ status: 'success', text: 'Treino criado!', duration: 2000 });

      selectedWorkoutsDispatch({
        type: 'ADD-WORKOUT',
        payload: {
          ...workoutStored.workout,
          exercisesCount: allWorkoutExercises.length,
        },
      });
    } catch (err: any) {
      toast({ status: 'error', text: err?.response?.data?.message });
    }
  }

  function resetWorkoutFields() {
    selectedExercisesDispatch({ type: 'PLACE-EXERCISES', payload: [] });

    if (workoutTitleRef.current && workoutDurationRef.current) {
      workoutTitleRef.current.value = '';
      workoutDurationRef.current.value = '';
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <h3 className="font-bold text-gray-600 text-3xl">Treinos</h3>
        <input
          className="bg-white h-[4.2rem] p-4 rounded-xl mt-4"
          placeholder="Título do treino"
          ref={workoutTitleRef}
          onChange={(e) => {
            workoutTitle.current = e.target.value;
          }}
        />
        <input
          className="bg-white h-[4.2rem] p-4 rounded-xl mt-4"
          placeholder='Duração. Ex: "15 minutos" '
          ref={workoutDurationRef}
          onChange={(e) => {
            workoutDuration.current = e.target.value;
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
                {exercise.name}
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
