import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Button } from 'components/Button';
import { IWorkout } from 'pages-components/CreateWorkoutsPlans';
import { SelectedWorkoutsAction } from 'pages-components/CreateWorkoutsPlans/reducers/selectedWorkoutsReducer';
import { EditSelectedWorkout } from '../EditSelectedWorkoutModal';

interface Props {
  selectedWorkouts: IWorkout[];
  selectedWorkoutsDispatch: Dispatch<SelectedWorkoutsAction>;
}

export const SelectedWorkouts = ({
  selectedWorkouts,
  selectedWorkoutsDispatch,
}: Props) => {
  const [isEditSelectedWorkoutModalOpen, setIsEditSelectedWorkoutModalOpen] =
    useState(false);

  const handleRemoveSelectedWorkout = useCallback(
    (workout: IWorkout) => {
      selectedWorkoutsDispatch({ type: 'REMOVE-WORKOUT', payload: workout });
    },
    [selectedWorkoutsDispatch]
  );

  const [workoutToEdit, setWorkoutToEdit] = useState({} as IWorkout);

  function handleOpenEditWorkoutModal(workout: IWorkout) {
    setWorkoutToEdit(workout);
    setIsEditSelectedWorkoutModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-col">
        <h3 className="font-bold text-gray-600 text-3xl">Treinos</h3>
        <div className="w-full flex flex-col gap-6 flex-1 bg-white rounded-3xl mt-6 p-6 overflow-y-scroll">
          {selectedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="relative flex flex-col items-center gap-4 bg-blue-100 p-6 rounded-[1.6rem] bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/564x/b8/ea/06/b8ea0615898a93c0fd3907a07bbda69c.jpg')",
              }}
            >
              <div className="absolute w-full h-full left-0 top-0 bg-[#00000050]" />
              {/* <div className='absolute w-full h-full top-0 '/> */}
              <span className="font-bold text-white text-3xl z-10">
                {workout.title}
              </span>
              <div className="flex w-full gap-3">
                <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                  Sets: {workout.sets}
                </div>
                <div className="bg-blue-50 text-blue-500 font-bold text-center py-2 px-6 flex-1 rounded-2xl z-10">
                  Reps: {workout.reps}
                </div>
              </div>
              <footer className="flex gap-2 w-full mt-4 z-10">
                <Button
                  type="button"
                  onClick={() => handleRemoveSelectedWorkout(workout)}
                  variant="danger"
                  className="w-full h-[3.6rem] flex-1"
                >
                  Remover
                </Button>
                <Button
                  type="button"
                  variant="white"
                  className="bg-white flex-1 h-[3.6rem] rounded-2xl"
                  onClick={() => handleOpenEditWorkoutModal(workout)}
                >
                  Editar
                </Button>
              </footer>
            </div>
          ))}
        </div>
      </div>
      <EditSelectedWorkout
        isOpen={isEditSelectedWorkoutModalOpen}
        setIsOpen={setIsEditSelectedWorkoutModalOpen}
        workout={workoutToEdit}
      />
    </>
  );
};
